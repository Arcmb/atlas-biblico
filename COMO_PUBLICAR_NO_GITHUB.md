# Como enviar o Atlas Bíblico manualmente para o GitHub

Repositório de destino: https://github.com/Arcmb/atlas-biblico

## Envio pelo navegador (sem Git e sem terminal)

1. Baixe o ZIP do projeto e **extraia o conteúdo** em uma pasta no computador.
2. Abra https://github.com/Arcmb/atlas-biblico e selecione a branch `main`.
3. Clique em **Add file → Upload files**.
4. Arraste o **conteúdo da pasta extraída**, incluindo as pastas `.github`, `assets`, `dados`, `scripts` e `tests`. Não envie o ZIP fechado como se fosse o site.
5. Na lista de arquivos, confira a presença de `index.html`, `atlas.html`, `app.js`, `atlas.js`, `dados/atlas_historico.js` e `.github/workflows/pages.yml`.
6. Escreva uma mensagem como `Publica versão completa do Atlas Bíblico` e clique em **Commit changes** na branch `main`.
7. Abra **Settings → Pages → Build and deployment** e escolha **GitHub Actions**.
8. Em **Actions**, acompanhe o fluxo **Publicar Atlas Bíblico (GitHub Pages)** até concluir.

O endereço esperado, após a configuração do Pages e um deploy bem-sucedido, é:

https://arcmb.github.io/atlas-biblico/

> **Atenção:** esse repositório já possui uma versão básica com `index.html` e `atlas.html`. Ao enviar o conteúdo extraído, alguns arquivos de mesmo nome serão substituídos e outros serão adicionados. Esse é o comportamento esperado para instalar a versão completa do projeto neste mesmo repositório.

## Arquivos importantes

- **`index.html`**: página inicial; redes de referências e pesquisa.
- **`atlas.html`**: atlas geográfico, rotas e cronologia animada.
- **`dados/`**: bases locais usadas pelas telas.
- **`conexoes_biblicas_offline.html`** e **`atlas_historico_offline.html`**: versões independentes, abríveis por duplo clique, úteis para demonstração offline.
- **`.github/workflows/pages.yml`**: automatiza a publicação.
- **`README.md`**: arquitetura, requisitos e testes.
- **`FONTES_E_LIMITES.md`**: fontes e precisão histórica.

## Como abrir localmente

Para as versões independentes, abra os arquivos `*_offline.html` com duplo clique. Para testar a estrutura com vários arquivos, abra um terminal na pasta extraída e rode:

```powershell
py -m http.server 8000
```

Depois abra http://localhost:8000/ no navegador.

## Limitações atuais

A enciclopédia já contém 146 fichas offline e o atlas histórico conta com itinerários editoriais. **O conjunto completo de referências cruzadas e a íntegra do texto bíblico não estão embutidos no pacote inicial.** O script `montar_base_total.py` é destinado a preparar dados adicionais, com acesso à internet durante a preparação. Rotas e datas históricas são esquemáticas quando há incerteza documental.
