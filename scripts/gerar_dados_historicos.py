"""Gera o catálogo geográfico offline (localizações e roteiros editoriais).
O material não identifica trajetos historicamente não documentados como exatos.
"""
import json
from pathlib import Path
P=Path(__file__).resolve().parents[1]
places=[]
def place(id,name,lat,lon,desc,refs,modern='',certainty='localização identificada'):
    places.append(dict(id=id,name=name,lat=lat,lon=lon,summary=desc,refs=refs,modern=modern,certainty=certainty))
place('belem','Belém da Judeia',31.704,35.205,'Cidade de Judá relacionada à família de Davi e ao nascimento de Jesus.', ['Ruth.1.1','1Sam.16.4','Mic.5.2','Luke.2.4','Matt.2.1'],'Cisjordânia')
place('nazare','Nazaré',32.699,35.304,'Localidade da Galileia em que Jesus foi criado; associada também a Maria e José.', ['Luke.1.26','Luke.2.39','Matt.2.23','Luke.4.16'],'Israel')
place('jerusalem','Jerusalém',31.778,35.235,'Cidade ligada à monarquia davídica, ao templo, aos últimos acontecimentos do ministério de Jesus e ao início da igreja.', ['2Sam.5.6','1Kgs.8.1','Mark.11.11','Luke.24.47','Acts.2.5'],'Jerusalém')
place('capernaum','Cafarnaum',32.881,35.575,'Cidade à margem do lago de Genesaré, importante centro das atividades de Jesus na Galileia.', ['Matt.4.13','Mark.1.21','Luke.4.31'],'Israel')
place('cana','Caná da Galileia',32.752,35.357,'Localidade mencionada no relato do casamento em Caná; identificação arqueológica precisa discutida.', ['John.2.1','John.4.46'],'Galileia', 'identificação tradicional; sítio discutido')
place('jerico','Jericó',31.872,35.445,'Cidade próxima ao vale do Jordão, presente nas narrativas de Josué e na viagem de Jesus.', ['Josh.6.20','Luke.18.35','Luke.19.1'],'Cisjordânia')
place('betania','Betânia',31.772,35.269,'Povoado próximo de Jerusalém, associado a Marta, Maria e Lázaro.', ['John.11.1','Mark.11.1','John.12.1'],'Al-Eizariya, Cisjordânia')
place('sicar','Sicar / região de Samaria',32.212,35.283,'Área tradicionalmente associada ao encontro de Jesus com uma mulher samaritana; identificação da povoação discutida.', ['John.4.4','John.4.5','John.4.7'],'Região de Nablus', 'localização aproximada; topônimo discutido')
place('jordao','Rio Jordão (setor sul)',31.836,35.553,'Área do Jordão usada como marcador esquemático do batismo de Jesus, sem fixar ponto exato.', ['Matt.3.13','Mark.1.9','John.1.28'],'Vale do Jordão','ponto apenas indicativo; sítio preciso debatido')
place('deserto','Deserto da Judeia',31.57,35.38,'Região desértica utilizada para representar o episódio das tentações de Jesus; a localização não é indicada no texto.', ['Matt.4.1','Luke.4.1'],'Deserto da Judeia','região aproximada; local exato desconhecido')
place('galileia','Região da Galileia',32.81,35.50,'Região do norte de Israel onde os Evangelhos situam muitos ensinos e milagres de Jesus.', ['Matt.4.23','Mark.1.14','Luke.4.14'],'Israel', 'marcador regional aproximado')
place('egito','Egito (marcador regional)',30.06,31.23,'Região usada apenas para situar geograficamente a fuga da família de Jesus. O Evangelho não informa a cidade em que permaneceu.', ['Matt.2.13','Matt.2.14','Matt.2.19'],'Egito','posição ilustrativa; não é a cidade do refúgio')
place('tiro','Tiro',33.274,35.197,'Cidade fenícia mencionada em passagens proféticas e nos Evangelhos.', ['Matt.15.21','Mark.7.24'],'Líbano')
place('sidom','Sidom',33.560,35.375,'Cidade fenícia costeira mencionada nas Escrituras.', ['Matt.15.21','Mark.7.31'],'Líbano')
place('cesareia','Cesareia Marítima',32.503,34.895,'Porto romano da Judeia relevante nos relatos do livro de Atos.', ['Acts.10.1','Acts.23.23'],'Israel')
place('ur','Ur',30.963,46.105,'Cidade da Mesopotâmia geralmente identificada com Ur, no sul do atual Iraque. Há discussões sobre a localização da Ur bíblica.', ['Gen.11.28','Gen.11.31'],'Iraque','identificação tradicional, debatida')
place('hara','Harã',36.864,39.025,'Centro urbano na Alta Mesopotâmia; Gênesis relata que a família de Abrão permaneceu ali.', ['Gen.11.31','Gen.12.4'],'Türkiye')
place('siquem','Siquém',32.212,35.285,'Local da região de Canaã relacionado à chegada de Abrão e a várias narrativas de Israel.', ['Gen.12.6','Josh.24.1'],'Região de Nablus')
place('betel','Betel',31.94,35.22,'Localidade associada a Abrão, Jacó e à história de Israel; identificação exata tem alternativas.', ['Gen.12.8','Gen.28.19'],'Cisjordânia','identificação aproximada')
place('hebron','Hebrom',31.533,35.093,'Cidade das narrativas dos patriarcas e do início do reinado de Davi.', ['Gen.13.18','Gen.23.2','2Sam.2.11'],'Cisjordânia')
place('goshen','Terra de Gósen (marcador regional)',30.7,31.75,'Região do delta oriental do Nilo associada à residência dos israelitas no Egito, sem localização pontual segura.', ['Gen.47.6','Exod.8.22'],'Delta do Nilo','região aproximada')
place('rameses','Ramessés (localização discutida)',30.80,31.90,'Uma das localidades citadas como ponto de partida do Êxodo; posicionamento baseado em hipóteses.', ['Exod.12.37'],'Delta oriental do Nilo','localização contestada')
place('mar_travessia','Travessia do mar (posição ilustrativa)',29.90,32.48,'Marcador esquemático para a travessia narrada no Êxodo; o local histórico exato é objeto de intenso debate.', ['Exod.14.21','Exod.14.22'],'Região do golfo de Suez','marcador deliberadamente esquemático')
place('sinai','Monte Sinai / Horebe',28.539,33.976,'Local associado à aliança e à entrega da Lei; o monte tradicional é uma entre diferentes propostas de identificação.', ['Exod.19.1','Exod.19.18','Exod.20.1'],'Península do Sinai','localização tradicional não comprovada')
place('cades','Cades-Barneia',30.663,34.418,'Localidade do período de peregrinação pelo deserto; a identificação arqueológica é discutida.', ['Num.13.26','Num.20.1'],'Região de Cades','localização aproximada')
place('moabe','Planícies de Moabe',31.77,35.63,'Área a leste do Jordão associada à etapa final da peregrinação de Israel.', ['Num.22.1','Deut.34.1'],'Jordânia','marcador regional')
place('moabe_rute','Moabe',31.44,35.70,'Região a leste do mar Morto de onde Rute acompanhou Noemi até Belém.', ['Ruth.1.1','Ruth.1.6','Ruth.1.16'],'Jordânia','região aproximada')
place('antioquia_siria','Antioquia da Síria',36.204,36.16,'Cidade de onde Paulo e Barnabé foram enviados na primeira viagem missionária.', ['Acts.13.1','Acts.13.3','Acts.14.26'],'Antakya, Türkiye')
place('seleucia','Selêucia Piéria',36.127,35.94,'Porto de onde Paulo e Barnabé partiram rumo a Chipre.', ['Acts.13.4'],'Região de Samandağ, Türkiye')
place('salamina','Salamina (Chipre)',35.178,33.904,'Cidade no leste de Chipre onde Paulo e Barnabé pregaram.', ['Acts.13.5'],'Chipre')
place('pafos','Pafos',34.772,32.423,'Cidade do oeste de Chipre visitada por Paulo e Barnabé.', ['Acts.13.6','Acts.13.12'],'Chipre')
place('perge','Perge',36.961,30.853,'Cidade da Panfília por onde Paulo passou na primeira viagem.', ['Acts.13.13','Acts.14.25'],'Türkiye')
place('antioquia_pisidia','Antioquia da Pisídia',38.306,31.188,'Cidade onde Paulo fez uma pregação em uma sinagoga.', ['Acts.13.14','Acts.13.16'],'Yalvaç, Türkiye')
place('iconio','Icônio',37.873,32.49,'Cidade da região da Licaônia visitada por Paulo e Barnabé.', ['Acts.14.1','Acts.14.21'],'Konya, Türkiye')
place('listra','Listra',37.56,32.49,'Localidade visitada por Paulo, que ali enfrentou hostilidade.', ['Acts.14.6','Acts.14.19','Acts.14.21'],'Türkiye','identificação aproximada')
place('derbe','Derbe',37.35,33.36,'Cidade mencionada como destino de Paulo na primeira viagem; localização arqueológica precisa discutida.', ['Acts.14.6','Acts.14.20'],'Türkiye','localização aproximada')
place('atalia','Atalia',36.90,30.70,'Porto de onde Paulo e Barnabé viajaram de volta a Antioquia.', ['Acts.14.25'],'Antalya, Türkiye')
place('damasco','Damasco',33.514,36.291,'Cidade associada à experiência de Saulo narrada em Atos 9.', ['Acts.9.3','Acts.9.10'],'Síria')
place('babilonia','Babilônia',32.536,44.420,'Centro do império neobabilônico associado ao exílio de Judá e ao livro de Daniel.', ['2Kgs.25.7','Dan.1.1','Ps.137.1'],'Iraque')
place('ribla','Ribla',34.39,36.30,'Localidade do episódio de captura e julgamento de Zedequias narrado em 2 Reis 25.', ['2Kgs.25.6'],'Síria','localização aproximada')
place('samaria_cidade','Samaria (cidade antiga)',32.276,35.193,'Antiga capital do reino de Israel, conquistada pelos assírios no século VIII a.C.', ['1Kgs.16.24','2Kgs.17.6'],'Sebastia, Cisjordânia')
place('ninive','Nínive',36.36,43.15,'Centro imperial assírio, lembrado especialmente no livro de Jonas.', ['Jonah.1.2','Nah.1.1'],'Região de Mosul, Iraque')
place('susa','Susã',32.19,48.25,'Capital persa relacionada às narrativas de Ester e Neemias.', ['Esth.1.2','Neh.1.1'],'Irã')
place('roma','Roma',41.902,12.496,'Capital imperial romana e destino de Paulo no final do livro de Atos.', ['Acts.28.14','Acts.28.16','Rom.1.7'],'Itália')
place('efeso','Éfeso',37.94,27.34,'Cidade da Ásia Menor relacionada à atuação missionária de Paulo.', ['Acts.19.1','Acts.19.10','Rev.2.1'],'Türkiye')
place('corinto','Corinto',37.94,22.93,'Cidade da Grécia visitada por Paulo e destinatária das cartas aos Coríntios.', ['Acts.18.1','1Cor.1.2'],'Grécia')
place('atenas','Atenas',37.98,23.73,'Cidade grega onde Paulo discursou no Areópago.', ['Acts.17.16','Acts.17.22'],'Grécia')
place('mara','Mara',29.82,33.77,'Local citado na narrativa do Êxodo; ponto geográfico é controverso.', ['Exod.15.23'],'Sinai','localização debatida')
place('galgala','Gilgal (região)',31.87,35.43,'Acampamento de Israel após a travessia do Jordão, com identificação exata debatida.', ['Josh.4.19','Josh.5.10'],'Vale do Jordão','localização aproximada')
place('hazor','Hazor',33.02,35.56,'Cidade no norte da terra de Israel mencionada na narrativa da conquista de Canaã.', ['Josh.11.1','Josh.11.10'],'Tel Hazor, Israel')

routes=[]
def route(id,name,category,kind,description,subtitle,steps,person=None,qualification=None):
    routes.append(dict(id=id,name=name,category=category,kind=kind,description=description,subtitle=subtitle,person=person,qualification=qualification or 'Os segmentos ligam pontos citados na narrativa; não reconstituem estradas ou deslocamentos exatos.',steps=[dict(place=p,title=t,summary=s,ref=r,period=d,icon=icon) for p,t,s,r,d,icon in steps]))
route('jesus','Vida de Jesus','personagens','male','Acompanhe episódios selecionados dos Evangelhos em diferentes localidades. A rota não representa todas as viagens nem resolve divergências cronológicas entre os relatos.','Infância, ministério e últimos acontecimentos',[
('belem','Nascimento em Belém','Relatos de Mateus e Lucas situam o nascimento de Jesus em Belém.','Luke.2.4-7','c. 6–4 a.C.','male'),
('egito','Fuga para o Egito','Segundo Mateus, a família se refugiou no Egito. A cidade de residência não é identificada.','Matt.2.13-14','Infância','male'),
('nazare','Crescimento em Nazaré','Os Evangelhos situam a infância e o crescimento de Jesus em Nazaré.','Luke.2.39-40','Infância e juventude','male'),
('jordao','Batismo no Jordão','João batiza Jesus no Jordão; o ponto no mapa representa somente a área geral.','Mark.1.9-11','Início do ministério','male'),
('deserto','Tentação no deserto','Os Evangelhos relatam uma permanência de Jesus no deserto, sem identificar o lugar preciso.','Matt.4.1-11','Início do ministério','male'),
('cana','Sinal em Caná','O Evangelho de João registra o primeiro sinal em um casamento em Caná.','John.2.1-11','Ministério','male'),
('capernaum','Atuação em Cafarnaum','A cidade aparece como um dos centros da atuação pública de Jesus na Galileia.','Matt.4.13','Ministério na Galileia','male'),
('sicar','Passagem pela Samaria','João relata o encontro de Jesus com uma mulher samaritana nas proximidades de Sicar.','John.4.4-7','Ministério','male'),
('jerico','Passagem por Jericó','Lucas narra a visita de Jesus a Jericó e o encontro com Zaqueu.','Luke.19.1-10','Fase final do ministério','male'),
('betania','Betânia','A aldeia é citada em episódios envolvendo Maria, Marta e Lázaro.','John.11.1','Próximo a Jerusalém','male'),
('jerusalem','Jerusalém','Os Evangelhos situam em Jerusalém a paixão, crucificação e relatos da ressurreição.','Luke.24.1-7','Acontecimentos finais','male')],person='Jesus',qualification='Sequência temática e parcialmente cronológica: não é um itinerário contínuo comprovado. A posição no Egito, no deserto e no Jordão é aproximada.')
route('paulo','Primeira viagem de Paulo','personagens','male','Roteiro de Atos 13–14, incluindo o retorno de Paulo e Barnabé por cidades visitadas. As linhas são segmentos esquemáticos entre localidades atestadas.','Paulo e Barnabé · Atos 13–14',[
('antioquia_siria','Envio de Antioquia','Paulo e Barnabé são separados e enviados para a missão.','Acts.13.1-3','Primeira viagem','male'),
('seleucia','Embarque em Selêucia','Partem do porto de Selêucia em direção a Chipre.','Acts.13.4','Primeira viagem','male'),
('salamina','Chegada a Salamina','Pregam nas sinagogas judaicas de Salamina.','Acts.13.5','Chipre','male'),
('pafos','Passagem por Pafos','Encontram o procônsul Sérgio Paulo.','Acts.13.6-12','Chipre','male'),
('perge','Perge','Chegam à Panfília.','Acts.13.13','Ásia Menor','male'),
('antioquia_pisidia','Antioquia da Pisídia','Paulo anuncia Jesus na sinagoga da cidade.','Acts.13.14-16','Ásia Menor','male'),
('iconio','Icônio','A missão encontra adesão e oposição.','Acts.14.1-5','Ásia Menor','male'),
('listra','Listra','Os moradores confundem os missionários com deuses; Paulo sofre violência.','Acts.14.8-19','Ásia Menor','male'),
('derbe','Derbe','Os apóstolos anunciam o evangelho e formam discípulos.','Acts.14.20-21','Ásia Menor','male'),
('listra','Retorno a Listra','Retornam fortalecendo os discípulos.','Acts.14.21-23','Retorno','male'),
('iconio','Retorno a Icônio','Revisitam comunidades formadas na viagem.','Acts.14.21-23','Retorno','male'),
('antioquia_pisidia','Retorno a Antioquia da Pisídia','Acompanham os discípulos e seguem viagem.','Acts.14.21-24','Retorno','male'),
('perge','Passagem por Perge','Pregam a palavra em Perge.','Acts.14.25','Retorno','male'),
('atalia','Embarque em Atalia','Do porto de Atalia seguem para Antioquia da Síria.','Acts.14.25-26','Retorno','male'),
('antioquia_siria','Retorno a Antioquia','Relatam à igreja o que Deus fizera na missão.','Acts.14.26-28','Fim da primeira viagem','male')],person='Paulo')
route('abraao','Jornada de Abraão','personagens','male','Percurso de cidades e regiões mencionadas nos relatos de Gênesis sobre Abrão/Abraão.','Chamado e peregrinação',[
('ur','Saída de Ur','Gênesis menciona a partida da família de Terá de Ur dos caldeus.','Gen.11.31','Época patriarcal; data incerta','male'),
('hara','Permanência em Harã','A família se estabelece em Harã; depois Abrão parte conforme o chamado.','Gen.12.4','Época patriarcal','male'),
('siquem','Chegada a Siquém','O texto relata a chegada de Abrão a Siquém, em Canaã.','Gen.12.6','Época patriarcal','male'),
('betel','Entre Betel e Ai','Abrão arma sua tenda e constrói um altar nas proximidades de Betel.','Gen.12.8','Época patriarcal','male'),
('egito','Viagem ao Egito','Gênesis narra uma permanência no Egito em contexto de fome. O local exato não é dado.','Gen.12.10','Época patriarcal','male'),
('betel','Retorno à região de Betel','Abrão retorna a um lugar em que antes havia construído um altar.','Gen.13.3-4','Época patriarcal','male'),
('hebron','Hebrom','O relato associa a Abraão uma residência na região de Manre, perto de Hebrom.','Gen.13.18','Época patriarcal','male')],person='Abraão')
route('maria','Trajetos de Maria','personagens','female','Episódios dos Evangelhos que situam Maria, mãe de Jesus, em diferentes lugares; não documentam todas as suas viagens.','Maria, mãe de Jesus',[
('nazare','Anunciação em Nazaré','O anjo Gabriel é enviado a Maria em Nazaré.','Luke.1.26-38','Antes do nascimento','female'),
('belem','Nascimento em Belém','Maria dá à luz Jesus em Belém.','Luke.2.4-7','Nascimento de Jesus','female'),
('egito','Refúgio no Egito','Mateus narra que José levou o menino e sua mãe ao Egito; não identifica a cidade.','Matt.2.13-14','Infância de Jesus','female'),
('nazare','Retorno à Galileia','A família volta e passa a viver em Nazaré.','Matt.2.23','Infância de Jesus','female'),
('jerusalem','Maria em Jerusalém','João relata a presença da mãe de Jesus junto à cruz.','John.19.25','Crucificação','female')],person='Maria, mãe de Jesus')
route('rute','Rute e Noemi','personagens','female','Trajeto da região de Moabe até Belém, conforme o livro de Rute.','Rute · fidelidade e recomeço',[
('moabe_rute','Vida em Moabe','A família de Elimeleque se estabelecera em Moabe, onde Rute se tornou parte da família.','Ruth.1.4','Tempo dos juízes','female'),
('moabe_rute','Decisão de acompanhar Noemi','Rute decide acompanhar Noemi em sua volta a Judá.','Ruth.1.16','Tempo dos juízes','female'),
('belem','Chegada a Belém','Rute e Noemi chegam a Belém no início da colheita da cevada.','Ruth.1.22','Tempo dos juízes','female')],person='Rute')
route('exodo','Êxodo de Israel','povos','group','Deslocamento coletivo do povo de Israel, apresentado como esquema didático. Grande parte do percurso é historicamente debatida e não pode ser traçada com exatidão.','Israel · Egito ao vale do Jordão',[
('goshen','Povo de Israel no Egito','Gênesis e Êxodo situam os israelitas na terra de Gósen, área não estabelecida exatamente.','Exod.1.7','Cronologia disputada','group'),
('rameses','Saída de Ramessés','Êxodo registra a partida de Ramessés; a identificação do sítio é discutida.','Exod.12.37','Cronologia disputada','group'),
('mar_travessia','Travessia do mar','O local exato da travessia é desconhecido; este ponto é apenas ilustrativo.','Exod.14.21-22','Cronologia disputada','group'),
('sinai','Aliança no Sinai','O relato apresenta a chegada ao monte Sinai e os acontecimentos da aliança.','Exod.19.1','Cronologia disputada','group'),
('cades','Acampamento em Cades','Cades-Barneia aparece no período de peregrinação no deserto.','Num.13.26','Cronologia disputada','group'),
('moabe','Planícies de Moabe','Israel acampa nas planícies de Moabe, a leste do Jordão.','Num.22.1','Cronologia disputada','group'),
('jerico','Travessia e entrada em Canaã','O livro de Josué relata a travessia do Jordão e eventos associados a Jericó.','Josh.3.17','Cronologia disputada','group')],qualification='Trajeto hipotético para estudo; não representa consenso sobre o Êxodo nem prova arqueológica dos pontos traçados.')
route('exilio','Exílio de Judá','povos','group','Marco narrativo da deportação de parte da população judaíta para o império babilônico. As linhas sintetizam deslocamentos, não itinerários individuais.', 'Judá · século VI a.C.',[
('jerusalem','Queda de Jerusalém','A conquista babilônica culmina em destruição e deportações.','2Kgs.25.8-11','587/586 a.C. (aprox.)','group'),
('ribla','Captura do rei Zedequias','Zedequias é levado a Ribla para julgamento segundo 2 Reis 25.','2Kgs.25.6','587/586 a.C. (aprox.)','group'),
('babilonia','Exílio na Babilônia','Parte da população é deportada; outras comunidades vivem fora da cidade, no território babilônico.','2Kgs.25.11','Século VI a.C.','group')],qualification='Sequência representativa de relatos diferentes; não significa que todos os deportados passaram por Ribla.')
route('retorno','Retorno do exílio','povos','group','Depois da conquista persa da Babilônia, grupos de exilados retornam a Jerusalém; caminhos precisos não são narrados em detalhe.','Babilônia → Jerusalém',[
('babilonia','Autorização para retornar','O decreto apresentado em Esdras 1 encoraja o retorno e a reconstrução do templo.','Ezra.1.1-3','A partir de 539/538 a.C.','group'),
('jerusalem','Reorganização em Jerusalém','Os repatriados atuam na restauração do culto e na reconstrução do templo.','Ezra.3.1-3','Séculos VI–V a.C.','group')],qualification='Ligação direta no mapa apenas indica origem e destino; não reconstrói a estrada percorrida.')
route('conquista','Campanhas de Josué','povos','group','Visão geográfica de lugares citados nas campanhas narradas em Josué; cronologia e historicidade são temas de investigação.', 'Josué · lugares da narrativa',[
('moabe','Israel a leste do Jordão','O povo se aproxima da entrada em Canaã.','Josh.1.2','Cronologia discutida','group'),
('galgala','Acampamento em Gilgal','A narrativa situa o primeiro acampamento após a travessia.','Josh.4.19','Cronologia discutida','group'),
('jerico','Jericó','O relato de Josué descreve o episódio das muralhas de Jericó.','Josh.6.20','Cronologia discutida','group'),
('hazor','Hazor','O relato situa em Hazor uma das campanhas do norte.','Josh.11.10-11','Cronologia discutida','group')],qualification='Sequência temática dos episódios de Josué. As datas e a correspondência arqueológica são debatidas.')
route('historia','História bíblica — panorama','historia','event','Uma linha do tempo geral com marcos da narrativa bíblica e sua localização aproximada no mundo antigo. Os pontos não formam uma viagem de um único povo.','Panorama de épocas, povos e personagens',[
('ur','Época dos patriarcas','Tradições de Gênesis situam a história de Abraão na Mesopotâmia e em Canaã.','Gen.11.31','Época patriarcal · data debatida','male'),
('goshen','Israel no Egito','A narrativa do Êxodo começa com a permanência dos israelitas no Egito.','Exod.1.7','Cronologia disputada','group'),
('sinai','Aliança no Sinai','O livro de Êxodo apresenta a aliança no Sinai.','Exod.19.1','Cronologia disputada','group'),
('jerico','Narrativas da entrada em Canaã','Josué descreve a travessia do Jordão e episódios em Canaã.','Josh.3.17','Cronologia disputada','group'),
('jerusalem','Monarquia davídica','Davi estabelece Jerusalém como centro político.','2Sam.5.6-9','c. século X a.C.','male'),
('samaria_cidade','Queda de Samaria','A capital do reino do norte cai para os assírios.','2Kgs.17.6','722/721 a.C. (aprox.)','group'),
('babilonia','Exílio de Judá','Após a conquista babilônica, parte da população é deportada.','2Kgs.25.11','587/586 a.C. (aprox.)','group'),
('jerusalem','Retorno do exílio','O livro de Esdras registra o retorno de exilados e a reconstrução.','Ezra.1.1-3','Após 539/538 a.C.','group'),
('belem','Nascimento de Jesus','Os Evangelhos situam o nascimento de Jesus em Belém.','Luke.2.7','c. 6–4 a.C.','male'),
('jerusalem','Pentecostes e igreja primitiva','Atos 2 narra os acontecimentos do Pentecostes em Jerusalém.','Acts.2.1-4','Século I d.C.','group'),
('antioquia_siria','Expansão missionária','Antioquia torna-se importante centro de envio missionário.','Acts.13.1-3','c. meados do século I d.C.','group'),
('roma','Pregação em Roma','O final de Atos situa Paulo pregando em Roma.','Acts.28.16','c. década de 60 d.C.','male')],qualification='Marcos de períodos diferentes: os saltos entre pontos NÃO representam viagens contínuas. Datas antigas e relações históricas são aproximadas.')

route('moises','Moisés e a travessia','personagens','male','Episódios associados à liderança de Moisés desde o Egito até as planícies de Moabe. Os locais de algumas etapas são discutidos.','Moisés · libertação e aliança',[
('rameses','Libertação do Egito','A saída dos israelitas é descrita no livro de Êxodo.','Exod.12.37','Cronologia disputada','male'),
('mar_travessia','Travessia do mar','Moisés estende a mão sobre o mar; o local é representado apenas de maneira ilustrativa.','Exod.14.21','Cronologia disputada','male'),
('sinai','Encontro no Sinai','A narrativa descreve Moisés recebendo a Lei no monte Sinai.','Exod.19.20','Cronologia disputada','male'),
('cades','Cades-Barneia','Os relatos do deserto mencionam Cades e eventos envolvendo Moisés.','Num.20.1','Cronologia disputada','male'),
('moabe','Últimos discursos','Deuteronômio situa o encerramento da trajetória de Moisés próximo às planícies de Moabe.','Deut.34.1','Cronologia disputada','male')],person='Moisés',qualification='O local exato da travessia, o monte Sinai e diversas etapas no deserto são temas de debate; linha apenas esquemática.')
route('davi','Davi: de pastor a rei','personagens','male','Três centros geográficos fundamentais da trajetória de Davi, sem representar as muitas outras movimentações narradas em Samuel.','Davi · pastor, rei e Jerusalém',[
('belem','Davi em Belém','Samuel unge Davi, filho de Jessé, em Belém.','1Sam.16.13','c. século XI–X a.C.','male'),
('hebron','Reinado em Hebrom','Davi começa a reinar sobre Judá em Hebrom.','2Sam.2.11','c. século X a.C.','male'),
('jerusalem','Capital em Jerusalém','A narrativa relata que Davi conquista a fortaleza de Sião e reina em Jerusalém.','2Sam.5.6-9','c. século X a.C.','male')],person='Davi')
route('daniel','Daniel e o exílio','personagens','male','Do contexto da conquista de Judá para a corte babilônica. As coordenadas ligam os centros narrativos, não a estrada percorrida.','Daniel · Jerusalém e Babilônia',[
('jerusalem','Jovens de Judá','O livro de Daniel situa sua abertura no contexto de Jerusalém e do domínio babilônico.','Dan.1.1-6','Século VI a.C.','male'),
('babilonia','Daniel na corte','Daniel e outros judeus passam a servir na corte babilônica.','Dan.1.6-7','Século VI a.C.','male')],person='Daniel')
route('igreja','Expansão da igreja primitiva','historia','event','Marcos geográficos da difusão inicial do cristianismo. A sequência representa acontecimentos em locais diferentes, não um único grupo viajando continuamente.','Atos · da Judeia à região mediterrânea',[
('jerusalem','Pentecostes em Jerusalém','Atos 2 situa o Pentecostes e a pregação de Pedro em Jerusalém.','Acts.2.1-4','Século I d.C.','group'),
('sicar','Pregação na Samaria','Atos 8 menciona o anúncio do evangelho em uma cidade da Samaria, não identificada aqui com precisão.','Acts.8.5','Século I d.C.','group'),
('antioquia_siria','Comunidade em Antioquia','Os discípulos recebem o nome de cristãos em Antioquia.','Acts.11.26','Século I d.C.','group'),
('salamina','Pregação em Chipre','Paulo e Barnabé anunciam a palavra em Salamina.','Acts.13.5','Século I d.C.','group'),
('efeso','Ação em Éfeso','Atos narra a permanência de Paulo e o alcance da mensagem na Ásia.','Acts.19.10','Século I d.C.','group'),
('roma','Pregação em Roma','Atos conclui com Paulo recebendo pessoas e anunciando o reino em Roma.','Acts.28.30-31','Século I d.C.','male')],qualification='A linha do tempo mostra etapas de propagação, sem representar uma rota de um só missionário ou povo. O marcador da Samaria é regional.')
route('reinos','Reinos de Israel e Judá','historia','event','Dois centros políticos, Samaria e Jerusalém, e seus destinos nas campanhas dos impérios da Assíria e Babilônia.','Monarquia dividida, conquistas e derrotas',[
('jerusalem','Reino de Judá','Depois da divisão, Jerusalém permanece como centro do reino de Judá.','1Kgs.12.17','Após a divisão do reino','group'),
('samaria_cidade','Samaria, capital de Israel','Onri constrói Samaria, que se torna capital do reino do norte.','1Kgs.16.24','Século IX a.C. (aprox.)','group'),
('samaria_cidade','Derrota do reino do norte','Samaria cai para os assírios; 2 Reis menciona deportações.','2Kgs.17.6','722/721 a.C. (aprox.)','group'),
('jerusalem','Derrota de Judá','Jerusalém é conquistada e o templo destruído pelos babilônios.','2Kgs.25.8-11','587/586 a.C. (aprox.)','group')],qualification='Este painel compara acontecimentos político-militares. Os saltos entre pontos não são movimentos de tropas documentados.')
route('jose','José do Egito','personagens','male','Do contexto familiar em Canaã à experiência de José no Egito, sem determinar o local da residência egípcia.','José · de Canaã ao Egito',[
('hebron','José e seus irmãos','A história de José começa na terra de Canaã, no âmbito da família de Jacó.','Gen.37.1-3','Época patriarcal','male'),
('egito','José é levado ao Egito','José é vendido e levado ao Egito, onde sua história prossegue na corte.','Gen.39.1','Época patriarcal','male')],person='José do Egito',qualification='Não há identificação pontual do local egípcio em que José permaneceu; o mapa usa um marcador regional.')

personsPlaces={
 'Jesus':['belem','egito','nazare','jordao','deserto','cana','capernaum','galileia','sicar','jerico','betania','jerusalem','tiro','sidom'],
 'Paulo':['antioquia_siria','seleucia','salamina','pafos','perge','antioquia_pisidia','iconio','listra','derbe','atalia','damasco','efeso','corinto','atenas','roma'],
 'Abraão':['ur','hara','siquem','betel','egito','hebron'],
 'Moisés':['goshen','rameses','mar_travessia','sinai','cades','moabe'],
 'Maria, mãe de Jesus':['nazare','belem','egito','jerusalem'],
 'Rute':['moabe_rute','belem'],
 'Davi':['belem','hebron','jerusalem'],
 'Daniel':['jerusalem','babilonia'],
 'José do Egito':['hebron','egito'],
 'Pedro':['galileia','capernaum','jerusalem','cesareia'],
 'Josué':['moabe','galgala','jerico','hazor'],
 'Ester':['susa'],
 'Elias':['jordao'],
 'João Batista':['jordao'],
 'Neemias':['susa','jerusalem'],
 'Esdras':['babilonia','jerusalem'],
 'Salomão':['jerusalem']
}
record={'schema':'atlas-historico-v1', 'attribution':'Cartografia adaptada de Natural Earth (domínio público); eventos, lugares e rotas: seleção editorial baseada nas passagens bíblicas indicadas; locais e trajetos aproximados conforme notas.', 'places':places,'journeys':routes,'personPlaces':personsPlaces}
(P/'dados/atlas_historico.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
(P/'dados/atlas_historico.js').write_text('/* Dados geográficos locais. As rotas são esquemas interpretativos com referências explícitas. */\nwindow.ATLAS_HISTORICO='+json.dumps(record,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
print('gerados',len(places),'lugares',len(routes),'roteiros',sum(len(x['steps']) for x in routes),'etapas')
