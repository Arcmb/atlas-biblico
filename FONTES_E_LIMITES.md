# Fontes, licenças e limites históricos

O Atlas Bíblico usa metadados, relações entre versículos e coordenadas, mas não infere que um segmento de mapa reproduz uma estrada historicamente percorrida.

## Dados distribuídos na versão inicial

- **Roteiros históricos e geográficos (`dados/atlas_historico.*`)**: curadoria editorial em português. Cada etapa contém uma referência à passagem bíblica de base. Estão incluídos locais identificados, localizações aproximadas e sítios disputados, sempre com uma nota de certeza. Os segmentos são ilustrativos, não geometrias de estradas ou limites geopolíticos.
- **Contornos geográficos (`dados/mapa_costas.js`)**: simplificação de um shapefile Natural Earth, escala 1:110 milhões, fornecido em domínio público. Site: https://www.naturalearthdata.com/about/terms-of-use/. Os contornos de costa são apenas referência geográfica; não indicam fronteiras da Antiguidade.
- **Enciclopédia local (`dados/enciclopedia_local.*`)**: fichas editoriais iniciais de pessoas, lugares e acontecimentos; não são uma concordância exaustiva. A geração opcional a partir de Theographic deve manter atribuição e licença CC BY-SA 4.0: https://github.com/robertrouse/theographic-bible-metadata.
- **Relações entre versículos**: a prévia inicial contém dezenas de pares de referência; a base integral *não* é enviada neste ZIP. Para ampliar, use a importação TSV do OpenBible.info (CC BY 4.0): https://www.openbible.info/labs/cross-references/ e https://github.com/neuu-org/bible-crossrefs-dataset.
- **Texto bíblico**: o HTML inicial não contém o texto integral da Bíblia. O módulo busca, quando permitido, a versão `almeida-livre` do projeto `midvash/bible-data`, identificada pela fonte como Almeida 1819 (Bíblia Livre), em domínio público: https://github.com/midvash/bible-data e https://github.com/midvash/bible-data/blob/main/SOURCES.md. Antes de redistribuir outra tradução, verifique os direitos autorais.

## Interpretação histórica

O mapa não constitui prova da ocorrência de um evento, da identificação de um sítio ou da cronologia em anos absolutos. Há situações em que o texto bíblico não identifica a localização exata: a fuga de Jesus para o Egito, a tentação no deserto, diversos pontos da rota do Êxodo e a localização da Ur dos caldeus são exemplos.

A **história geral** e a **expansão da igreja** são sequências de episódios em locais diferentes; **não representam o deslocamento de uma única pessoa ou povo**. As viagens de personagens também são reduções editoriais de narrativas mais amplas. As datas antigas e as identificações arqueológicas podem divergir conforme a tradição interpretativa e a pesquisa histórica.

### Fontes de comparação da primeira viagem de Paulo

- Atos 13–14.
- Itinerário de Atos 13–14 da ESV Global Study Bible: https://www.esv.org/resources/esv-global-study-bible/chart-44-07b/.

## Dados externos e atualização

A enciclopédia local e o Atlas Histórico funcionam offline a partir dos arquivos incluídos. A pesquisa por **todas as palavras de todos os versículos** exige que o texto bíblico integral seja incorporado ao pacote por meio dos scripts fornecidos ou importado. O panorama de **todas as referências cruzadas** exige a base TSV completa, que pode ser obtida e indexada depois. O usuário deve distinguir a cobertura local efetiva da cobertura disponível em fontes externas.

Atualizado em 22/10/2026.