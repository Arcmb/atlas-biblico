# Atlas Bíblico — Conexões e História Visual

Aplicação estática em português para explorar conexões entre versículos, pesquisas, personagens, lugares, rotas históricas e cronologia visual.

## Abrir
- [Conexões bíblicas e pesquisa](index.html)
- [Atlas geográfico e linha do tempo](atlas.html)

As duas páginas principais têm dados, estilos e scripts incorporados. O site pode ser aberto offline após baixar os dois arquivos (inclusive com as funcionalidades de amostra disponíveis no pacote). Os links entre elas funcionam se estiverem na mesma pasta.

## Publicação
O GitHub Actions em `.github/workflows/pages.yml` publica as páginas da branch `main` no GitHub Pages. Para habilitar, acesse **Settings → Pages → Build and deployment → GitHub Actions**. Site esperado: https://arcmb.github.io/atlas-biblico/ (disponível apenas após Pages ficar ativo e concluir a execução).

## Limites dos dados
- A enciclopédia local contém **146 fichas editoriais iniciais**.
- O atlas histórico usa rotas e coordenadas interpretativas; a trajetória de Jesus e a rota do Êxodo não são reconstruções exatas de cada deslocamento.
- A versão incorporada possui **uma amostra de referências cruzadas**, não todo o conjunto de mais de 300 mil relações.
- A pesquisa de texto bíblico completo depende de importar uma base textual adequada.
- O [pacote-fonte ampliado em ZIP](https://github.com/Arcmb/atlas-biblico) ainda não foi integralmente transferido para o GitHub: esta publicação contém duas interfaces autossuficientes, documentação e o workflow de Pages. O pacote-fonte original permanece disponível para download na conversa.

Consulte [FONTES_E_LIMITES.md](FONTES_E_LIMITES.md).
