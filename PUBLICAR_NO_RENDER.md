# Publicar o Atlas Bíblico no Render

O repositório já contém a configuração `render.yaml` para publicar o site completo.

## Publicação via Blueprint (recomendado)

1. Faça login em https://dashboard.render.com/ e conecte sua conta GitHub à Render.
2. Clique em **New > Blueprint**.
3. Selecione o repositório público **Arcmb/atlas-biblico**, branch `main`.
4. Aponte o Blueprint para **render.yaml** (na raiz).
5. Revise o serviço `atlasbiblico` e inicie a criação/sincronização.
6. Aguarde o deploy aparecer como **Live**.
7. Abra o URL informado pelo próprio Render. O objetivo é `https://atlasbiblico.onrender.com`, mas esse endereço exato depende de disponibilidade e das regras de nome da Render.

O Blueprint usa:

- **Tipo:** Static Site (`type: web`, `runtime: static`);
- **Nome solicitado:** `atlasbiblico`;
- **Git:** `https://github.com/Arcmb/atlas-biblico`, branch `main`;
- **Pasta publicada:** `./publicacao_github`;
- **Build:** valida a existência dos arquivos essenciais; não instala pacotes nem executa servidor.

## Alternativa: New > Static Site

Se preferir não usar Blueprint, crie um Static Site e informe:

- Repo: `Arcmb/atlas-biblico`
- Branch: `main`
- Root Directory: deixe **vazio**
- Build Command: `test -f publicacao_github/index.html && test -f publicacao_github/dados/biblia_completa.json && test -f publicacao_github/dados/cross_references.txt && test -f publicacao_github/dados/enciclopedia_total.js`
- Publish Directory: `publicacao_github`

**Não configure a raiz do repositório como Publish Directory**, pois as bases completas estão dentro de `publicacao_github/dados`.

## Verificação após o deploy

Teste no navegador:
- `/` — painel de conexões bíblicas
- `/atlas.html` — atlas geográfico e histórico
- `/dados/biblia_completa.json` — Bíblia em português
- `/dados/cross_references.txt` — base de referências cruzadas
- `/dados/enciclopedia_total.js` — catálogo de personagens, lugares e acontecimentos

Os três arquivos de dados devem responder sem erro 404. O arquivo de referências tem aproximadamente 8,3 MB; os primeiros carregamentos podem demorar conforme a conexão.

Não há necessidade de manter um computador ligado. Depois de conectar o repositório, mudanças na branch `main` podem disparar novas publicações automaticamente.

## Questões editoriais

Datas, rotas bíblicas e locais incertos são aproximações interpretativas; o mapa não deve ser entendido como reconstrução histórica exata. Consulte `FONTES_E_LIMITES.md` para as ressalvas e créditos das fontes.

**Importante:** inserir `render.yaml` no GitHub apenas configura o deploy. A criação do serviço no Render depende de uma conta autorizada e da execução dos passos acima.
