"""Cria um HTML autônomo do Atlas a partir dos arquivos do projeto.

Uso: py empacotar_html.py
      py empacotar_html.py --bible dados/biblia_completa.json --refs dados/cross_references.txt --entities dados/enciclopedia_local.json --output atlas_integral.html
O HTML gerado pode abrir por duplo clique sem internet, sem servidor ou dependências JS externas.
"""
from pathlib import Path
from argparse import ArgumentParser
import json
import re

BASE=Path(__file__).resolve().parent

def safe(js):
    # Escape para não fechar o <script> com conteúdo de um texto bíblico.
    return js.replace('</','<\\/').replace('\u2028','\\u2028').replace('\u2029','\\u2029')

def pack(output, refs=None, bible=None, entities=None):
    root=BASE
    html=(root/'index.html').read_text(encoding='utf-8')
    for name in ('style.css','research.css'):
        needle=f'<link rel="stylesheet" href="{name}">'
        if needle not in html:raise RuntimeError(f'A folha de estilo {name} não foi encontrada.')
        html=html.replace(needle,'<style>\n'+(root/name).read_text(encoding='utf-8')+'\n</style>',1)
    dataset=entities or (root/'dados/enciclopedia_local.json')
    record=json.loads(dataset.read_text(encoding='utf-8'))
    if not all(isinstance(record.get('data',{}).get(x),list) for x in ('people','places','events')):raise ValueError('Banco de entidades inválido.')
    snippets=['window.ATLAS_LOCAL_FIRST=true;', 'window.ATLAS_OFFLINE_ENTITIES='+safe(json.dumps(record,ensure_ascii=False,separators=(',',':')))+';']
    if refs:
        r=refs.read_text(encoding='utf-8-sig')
        if len(r.splitlines())<20:raise ValueError('Arquivo de referências parece incompleto.')
        snippets.append('window.ATLAS_OFFLINE_REFS='+safe(json.dumps(r,ensure_ascii=False))+';')
    if bible:
        b=json.loads(bible.read_text(encoding='utf-8-sig'))
        if len(b.get('books',[]))!=66:raise ValueError('Bíblia incompleta: devem existir 66 livros.')
        snippets.append('window.ATLAS_OFFLINE_BIBLE='+safe(json.dumps(b,ensure_ascii=False,separators=(',',':')))+';')
    html=html.replace('<script src="dados/enciclopedia_local.js"></script>','<script>\n'+'\n'.join(snippets)+'\n</script>',1)
    for name in ('app.js','research.js'):
        html=html.replace(f'<script src="{name}"></script>','<script>\n'+(root/name).read_text(encoding='utf-8')+'\n</script>',1)
    if re.search(r'<link rel="stylesheet"|<script src=',html):raise RuntimeError('Há dependência local que não foi incorporada.')
    output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(html,encoding='utf-8')
    return output

def main():
    p=ArgumentParser()
    p.add_argument('--refs',type=Path)
    p.add_argument('--bible',type=Path)
    p.add_argument('--entities',type=Path)
    p.add_argument('--output',type=Path,default=BASE/'atlas_biblico_local.html')
    opts=p.parse_args()
    out=pack(opts.output,opts.refs,opts.bible,opts.entities)
    print(f'Arquivo criado: {out} | {out.stat().st_size / 1024 / 1024:.2f} MB | pronto para funcionar offline')

if __name__=='__main__':main()
