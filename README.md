# Atlas Bíblico — conexões, personagens e história no mapa

Sistema em português com visualização dos vínculos entre versículos, explorações em cadeia, pesquisa de pessoas e lugares e rotas bíblicas em um mapa com personagens e povos animados. Interface escura, responsiva e construída apenas com **HTML, CSS, JavaScript e JSON locais**. Não exige Django, Node.js ou banco de dados em servidor.

![Visualização do atlas histórico](assets/preview_atlas.png)

![Mapa das conexões bíblicas](assets/preview_conexoes.png)

## Abrir o programa

1. Extraia o ZIP inteiro, preservando as pastas `dados/` e `assets/`.
2. Abra **`index.html`** para o panorama de conexões e a pesquisa bíblica.
3. Clique em **“Atlas geográfico e histórico”** (ou abra `atlas.html`) para mapa, personagens, povos e linha do tempo.
4. Selecione um roteiro, use **▶** para mover o personagem, clique nas etapas ou nos pontos e abra as referências no módulo de conexões.

O mapa histórico e a enciclopédia local funcionam mesmo sem internet após extrair os arquivos. Para visualizar o atlas histórico como um **arquivo HTML único**, abra `atlas_historico_offline.html`, também incluído no projeto. Esse arquivo abre sozinho; os links de volta às conexões dependem de `index.html` estar na mesma pasta.

## O que já está implementado

| Módulo | Recursos |
| --- | --- |
| Conexões bíblicas | Mapa de arcos entre livros, clique no arco para ler referências, filtro do versículo selecionado no panorama, diagrama radial, popup de texto, exportação PNG/SVG |
| Conexões em cadeia | Rede navegável por nós/pontos, expansão progressiva para outras referências, seleção de arestas |
| Pesquisa por palavra | Pesquisa em versículos quando a base textual apropriada estiver carregada; indicadores de conexões das referências |
| Enciclopédia offline | **146 fichas iniciais**: personagens, cidades/lugares, acontecimentos; resumos e referências; cadastro e exportação de fichas |
| Atlas geográfico | **50 lugares** com coordenadas e notas de precisão; mapa com contornos costeiros locais, pontos interativos, zoom, pan e exportação SVG |
| Rotas e linhas do tempo | **16 roteiros** e **91 etapas** editoriais: Jesus, Paulo, Maria, Rute, Abraão, Moisés, Davi, Daniel, Êxodo, exílio, conquistas, retorno, reinos e outros |
| Animação | Personagens masculino/feminino, ícone coletivo para povos, reprodução/pausa, velocidade e avanço etapa a etapa |

**Limite importante:** a versão distribuída inclui uma **prévia de referências cruzadas** e não os mais de 300 mil pares do OpenBible.info, nem os 31 mil versículos em texto completo. Os módulos históricos e as 146 fichas estão de fato incluídos localmente. Os scripts na pasta raiz permitem preparar ou incorporar os conjuntos maiores com acesso à internet uma vez, respeitando suas licenças. Não confunda a abrangência da fonte externa com a abrangência da versão inicial.

## Publicar no GitHub Pages

1. Entre no GitHub e crie um repositório novo, por exemplo `atlas-biblico-interativo`.
2. Envie **o conteúdo da pasta extraída**, incluindo `.github/workflows/pages.yml`, `index.html`, `atlas.html`, `app.js`, `atlas.js`, estilos e `dados/`.
3. Na página do repositório, acesse **Settings → Pages → Build and deployment → GitHub Actions**.
4. Vá em **Actions** e execute o fluxo `Publicar Atlas Bíblico (GitHub Pages)` se o deploy ainda não tiver ocorrido (push na branch `main` o dispara automaticamente).
5. A URL do site será do formato `https://SEU-USUARIO.github.io/atlas-biblico-interativo/` para um repositório comum.

Sem GitHub Actions, também é possível ativar o Pages via **Deploy from a branch → main → / (root)**. Escolha apenas um método de publicação. Se o repositório for privado, verifique as opções de Pages habilitadas para a sua conta.

**Importante:** esta entrega é um **ZIP pronto para ser enviado ao GitHub**. Nenhuma alteração é aplicada automaticamente à sua conta ou a algum repositório existente.

## Pastas principais

```text
atlas-biblico/
├── index.html                 # Conexões bíblicas, cadeia, pesquisas e enciclopédia
├── atlas.html                 # Atlas histórico e linha do tempo animada
├── atlas.js / atlas.css       # Interface e interações do mapa
├── app.js / style.css         # Conexões bíblicas
├── research.js / research.css # Pesquisa por palavra e entidades
├── dados/
│   ├── atlas_historico.js/json       # 50 lugares e 16 roteiros
│   ├── mapa_costas.js               # Geometria Natural Earth simplificada
│   └── enciclopedia_local.js/json   # 146 fichas offline
├── scripts/
│   ├── gerar_dados_historicos.py    # Editar/atualizar as rotas editoriais
│   └── empacotar_atlas.py           # Gera HTML histórico independente
├── montar_base_total.py      # Download opcional das bases externas
├── empacotar_html.py         # HTML único de conexões
├── tests/                     # Testes de dados e smoke test de interface
├── FONTES_E_LIMITES.md
└── .github/workflows/pages.yml
```

## Desenvolvimento local

Para visualizar como site servido localmente (útil para testar downloads opcionais via `fetch`):

```powershell
cd atlas-biblico
py -m http.server 8000
```

Acesse `http://localhost:8000` no navegador. A enciclopédia e o mapa histórico também podem ser abertos por duplo clique no HTML, sem Python.

**Gerar um HTML único do atlas histórico:**

```powershell
py scripts/empacotar_atlas.py
```

**Gerar uma versão mais extensa para uso offline (exige internet na preparação):**

```powershell
py montar_base_total.py
```

O segundo script pode baixar bases grandes e não é obrigatório para visualizar o Atlas Histórico. Verifique eventuais alterações no formato das fontes antes de atualizar os dados; o download integral não foi executado durante esta entrega. A opção `--somente-entidades` limita a preparação ao catálogo. Consulte as instruções de cada script para detalhes.

**Verificar consistência dos dados:**

```powershell
py -m unittest discover -s tests -p "test_dados.py" -v
```

## Critérios de precisão

Datas, georreferências e itinerários antigos são indicativos e podem ser debatidos. A rota do Êxodo é particularmente controversa; a “Vida de Jesus” é uma seleção didática de episódios, e a “História bíblica — panorama” é uma sucessão de épocas, não um movimento contínuo de um único indivíduo. Não criamos linhas de deslocamento contínuo para a visão geral da história. Leia [Fontes e limites](FONTES_E_LIMITES.md) antes de usar como material de estudo ou apresentação.

## Licenciamento dos dados

- Mapas costeiros Natural Earth: domínio público.
- OpenBible.info: CC BY 4.0 para as referências importadas.
- Theographic (quando importado): CC BY-SA 4.0.
- Texto `almeida-livre` da coleção Midvash: verificar versão e `SOURCES.md` (indicada na fonte como domínio público).
- Resumos, dados geográficos selecionados e a lógica visual fornecidos neste projeto são editoriais; manter as atribuições externas. A publicação do código sob uma licença de terceiros (MIT, GPL etc.) pode ser decidida pelo responsável pelo repositório.

Documentação detalhada: [FONTES_E_LIMITES.md](FONTES_E_LIMITES.md).


## Publicação no Render

O repositório inclui [render.yaml](render.yaml) para implantar o Atlas com os bancos completos (diretório `publicacao_github`) como um site estático chamado `atlasbiblico`. Consulte o guia [PUBLICAR_NO_RENDER.md](PUBLICAR_NO_RENDER.md) para criar o serviço no painel do Render e verificar a publicação. O endereço `atlasbiblico.onrender.com` depende de disponibilidade.
