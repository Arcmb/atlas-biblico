"""Gera um arquivo HTML único, contendo atlas histórico, mapa, dados e estilos.

Uso (a partir da raiz do projeto):
  py scripts/empacotar_atlas.py

O HTML resultante não depende de servidor para visualizar o Atlas Histórico.
Os botões que abrem o módulo de conexões ainda se referem a index.html.
"""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]

def main():
    html=(ROOT/'atlas.html').read_text(encoding='utf-8')
    html=re.sub(r'<link rel="stylesheet" href="([^"]+)">',lambda m:'<style>\n'+(ROOT/m.group(1)).read_text(encoding='utf-8')+'\n</style>',html)
    def script(m):
        js=(ROOT/m.group(1)).read_text(encoding='utf-8')
        return '<script>\n'+js.replace('</','<\\/')+'\n</script>'
    html=re.sub(r'<script src="([^"]+)"></script>',script,html)
    if re.search(r'<script src=|<link rel="stylesheet"',html):raise RuntimeError('Há uma dependência que não foi incorporada.')
    outfile=ROOT/'atlas_historico_offline.html'
    outfile.write_text(html,encoding='utf-8')
    print(f'Gerado: {outfile} ({outfile.stat().st_size//1024} KB)')

if __name__=='__main__':main()
