"""Prepara o atlas completo, com datasets incorporados ao HTML para consulta futura offline.

O comando requer INTERNET uma única vez para baixar OpenBible, Bíblia Livre e Theographic.
Depois disso, a versão 'atlas_biblico_integral_offline.html' não requer rede.

Executar no Windows: py montar_base_total.py
Opcional: --somente-entidades (não baixa Bible nem referências)
"""
from __future__ import annotations
from urllib.request import Request,urlopen
from urllib.error import URLError
from argparse import ArgumentParser
from zipfile import ZipFile
from io import BytesIO
from pathlib import Path
from collections import defaultdict
import json, re, sys, time
from empacotar_html import pack, BASE

REF_URL='https://a.openbible.info/data/cross-references.zip'
BIBLE_URL='https://raw.githubusercontent.com/midvash/bible-data/main/versions/pt/almeida-livre/almeida-livre.json'
SOURCE='https://raw.githubusercontent.com/robertrouse/theographic-bible-metadata/master/json/'
BOOKS='Gen Exod Lev Num Deut Josh Judg Ruth 1Sam 2Sam 1Kgs 2Kgs 1Chr 2Chr Ezra Neh Esth Job Ps Prov Eccl Song Isa Jer Lam Ezek Dan Hos Joel Amos Obad Jonah Mic Nah Hab Zeph Hag Zech Mal Matt Mark Luke John Acts Rom 1Cor 2Cor Gal Eph Phil Col 1Thess 2Thess 1Tim 2Tim Titus Phlm Heb Jas 1Pet 2Pet 1John 2John 3John Jude Rev'.split()
BOOK_SET=set(BOOKS)


def fetch(url)->bytes:
    last=None
    for i in range(3):
        try:
            with urlopen(Request(url,headers={'User-Agent':'Atlas-Biblico-Offline/3.0 (personal research)'}),timeout=85) as f:
                return f.read()
        except Exception as exc:
            last=exc
            if i<2:time.sleep(2+i*3)
    raise RuntimeError(f'Falha ao baixar {url}: {last}')


def download_to(path:Path,url:str)->Path:
    if path.is_file() and path.stat().st_size>10000:
        print(f'  Cache encontrado: {path.name}');return path
    print(f'  Baixando: {url}')
    data=fetch(url)
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_bytes(data)
    print(f'  Gravado {path.name} ({len(data)//1024} KB)')
    return path


def get_references(folder:Path)->Path:
    path=folder/'cross_references.txt'
    if path.exists() and path.stat().st_size>20000:return path
    blob=fetch(REF_URL)
    with ZipFile(BytesIO(blob)) as z:
        names=[x for x in z.namelist() if x.lower().endswith('.txt')]
        if not names:raise ValueError('ZIP da OpenBible não contém arquivo de texto')
        txt=z.read(max(names,key=lambda n:z.getinfo(n).file_size))
    path.write_bytes(txt)
    if len(txt.splitlines())<50000:raise ValueError('Dados de referências incompletos')
    return path


def records(obj, key):
    if isinstance(obj,list):return obj
    if isinstance(obj,dict):
        if isinstance(obj.get(key),list):return obj[key]
        if isinstance(obj.get('data'),list):return obj['data']
        if obj and all(isinstance(v,dict) for v in obj.values()):
            return [dict(id=k,**{kk:vv for kk,vv in v.items() if kk!='id'}) if 'id' not in v else v for k,v in obj.items()]
    raise ValueError(f'Formato de {key} não reconhecido; não foi possível preservar a integridade do catálogo')


def extract_ids(data):
    # Os arrays em Theographic armazenam IDs de outras tabelas; formas alternativas são aceitas.
    if isinstance(data,dict):return [str(data.get('id') or data.get('personId') or data.get('placeId') or data.get('eventId') or '')]
    if isinstance(data,(str,int)):return [str(data)]
    if isinstance(data,list):
        result=[]
        for x in data:result.extend(extract_ids(x))
        return result
    return []


def osis_ref(o):
    s=str(o.get('osisRef') or o.get('reference') or o.get('ref') or '')
    m=re.match(r'^([A-Za-z0-9]+)\.(\d+)\.(\d+)$',s)
    if m and m.group(1) in BOOK_SET:return s
    book=o.get('book') or o.get('bookOsis')
    if isinstance(book,dict):book=book.get('osisRef') or book.get('shortName')
    if isinstance(book,int) and 1<=book<=66:book=BOOKS[book-1]
    chap=o.get('chapter') or o.get('chapterNum')
    vers=o.get('verse') or o.get('verseNum')
    if str(book) in BOOK_SET and str(chap).isdigit() and str(vers).isdigit():return f'{book}.{chap}.{vers}'
    return None


def string_desc(value):
    if isinstance(value,list):return ' '.join(str(v) for v in value if isinstance(v,str))[:2300]
    return str(value or '')[:2300]


def build_catalog(folder:Path):
    tables={}
    for typ in ('people','places','events','verses'):
        path=download_to(folder/f'theographic_{typ}.json',SOURCE+typ+'.json')
        tables[typ]=records(json.loads(path.read_text(encoding='utf-8-sig')),typ)
        print(f'    {typ}: {len(tables[typ])} registros')
    # Indexa relações explícitas do repositório, sem inferir nomes por coincidência.
    idx=defaultdict(set)
    verified=0
    for v in tables['verses']:
        if not isinstance(v,dict):continue
        ref=osis_ref(v)
        if not ref:continue
        verified+=1
        for typ in ('people','places','events'):
            ids=extract_ids(v.get(typ,[]))
            for ident in ids:
                if ident:idx[(typ,ident)].add(ref)
    print(f'  Versículos indexados com referência canônica: {verified}')
    # Exigir ID e referências reais da tabela evita criar um falso catálogo de menções.
    if verified<20000:raise RuntimeError('Não foi possível identificar os versículos da fonte (esperado: mais de 20 mil). Confira a versão do Theographic.')
    original=json.loads((BASE/'dados/enciclopedia_local.json').read_text(encoding='utf-8'))
    out={k:list(v) for k,v in original['data'].items()}
    all_count=0
    ref_count=0
    for typ in ('people','places','events'):
        known={x.get('en','').lower():i for i,x in enumerate(out[typ])}
        for item in tables[typ]:
            if not isinstance(item,dict):continue
            nm=item.get('name') or item.get('title') or item.get('shortName')
            if not nm:continue
            ident=str(item.get('id') or item.get('personId') or item.get('placeId') or item.get('eventId') or '')
            if not ident:continue
            refs=sorted(idx[(typ,ident)],key=lambda r:(BOOKS.index(r.split('.')[0]),*map(int,r.split('.')[1:])))
            # Algumas versões têm referências na própria entidade; valida cada OSIS.
            for raw in item.get('references',[]) if isinstance(item.get('references'),list) else []:
                if isinstance(raw,dict):
                    r=osis_ref(raw)
                    if r and r not in refs:refs.append(r)
                elif isinstance(raw,str) and re.match(r'^[\w]+\.\d+\.\d+$',raw):
                    refs.append(raw)
            refs=list(dict.fromkeys(refs))
            description=string_desc(item.get('description'))
            row={'name':nm,'en':nm,'summary':f'Registro de {"personagem" if typ=="people" else "local" if typ=="places" else "acontecimento"} bíblico. Consulte as referências e a descrição original para estudar sua trajetória e o contexto.',
                 'englishDescription':description,'source':'Theographic Bible Metadata (CC BY-SA 4.0)','refs':refs,
                 'refScope':'Menções documentadas e indexadas na fonte Theographic; dados vinculados à edição KJV',
                 'featureType':item.get('featureType'), 'latitude':item.get('latitude'),'longitude':item.get('longitude'),
                 'metadata':[f'Nome original: {nm}']}
            for label,k in [('Também chamado','alsoCalled'),('Título','title'),('Observação','comment')]:
                val=item.get(k)
                if val:row['metadata'].append(f'{label}: '+string_desc(val)[:160])
            if nm.lower() in known:
                existing=out[typ][known[nm.lower()]]
                out[typ][known[nm.lower()]]={**row,**existing,'refs':list(dict.fromkeys([*refs,*existing.get('refs',[])])),'englishDescription':description}
            else:out[typ].append(row)
            all_count+=1;ref_count+=len(refs)
    if all_count<3500:raise RuntimeError('O catálogo Theographic baixado não tem o número esperado de entidades. Cancelado.')
    if ref_count<10000:raise RuntimeError('O indexador não conseguiu recuperar referências suficientes. Cancelado para evitar vínculos incompletos.')
    result={'schema':'atlas-entities-v1','license':'Theographic CC BY-SA 4.0; fichas editoriais originais mantidas em português','meta':{'coverage':'Theographic integral + fichas editoriais em português','complete':True,'counts':{k:len(v) for k,v in out.items()},'source':'https://github.com/robertrouse/theographic-bible-metadata'},'data':out}
    dest=BASE/'dados/enciclopedia_total.json'
    dest.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
    print('  Entidades incorporadas:',result['meta']['counts'],'| menções indexadas:',ref_count)
    return dest


def main():
    parser=ArgumentParser()
    parser.add_argument('--somente-entidades',action='store_true',help='Inclui o catálogo Theographic, sem baixar Bíblia e referências')
    a=parser.parse_args()
    folder=BASE/'dados/baixados'
    folder.mkdir(parents=True,exist_ok=True)
    print('[1/3] Enciclopédia bíblica')
    entity_path=build_catalog(folder)
    bible=refs=None
    if not a.somente_entidades:
        print('[2/3] Bíblia completa em português')
        bible=download_to(folder/'biblia_almeida_livre.json',BIBLE_URL)
        if len(json.loads(bible.read_text(encoding='utf-8')).get('books',[]))!=66:raise ValueError('A Bíblia baixada não contém 66 livros')
        print('[3/3] Mapa de referências cruzadas')
        refs=get_references(folder)
    else:print('[2/3] Modo somente enciclopédia: mantém prévia de textos e ligações')
    path=BASE/'atlas_biblico_integral_offline.html'
    pack(path,refs=refs,bible=bible,entities=entity_path)
    print(f'Pronto: {path} | {(path.stat().st_size/1e6):.1f} MB')
    print('Após gerar o arquivo, você pode abrir diretamente no navegador sem usar internet.')

if __name__=='__main__':main()
