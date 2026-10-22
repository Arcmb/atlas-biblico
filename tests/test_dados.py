"""Valida coerência interna do catálogo geográfico. Sem bibliotecas externas.

Rodar: py -m unittest discover -s tests -p 'test_dados.py'
"""
import json
import re
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'dados/atlas_historico.json').read_text(encoding='utf-8'))
REF=re.compile(r'^[1-3]?[A-Za-z]+\.\d+\.\d+(?:-\d+)?$')

class DataTests(unittest.TestCase):
    def test_unique_places(self):
        places=DATA['places']
        self.assertGreaterEqual(len(places),45)
        self.assertEqual(len({p['id'] for p in places}),len(places))
        for p in places:
            self.assertTrue(-90<=p['lat']<=90)
            self.assertTrue(-180<=p['lon']<=180)
            self.assertTrue(p.get('summary'))
            self.assertTrue(p.get('certainty'))
            self.assertTrue(p.get('refs'))
            for ref in p['refs']:
                self.assertRegex(ref,REF)

    def test_routes(self):
        places={p['id'] for p in DATA['places']}
        routes=DATA['journeys']
        self.assertGreaterEqual(len(routes),12)
        self.assertEqual(len({r['id'] for r in routes}),len(routes))
        for r in routes:
            self.assertTrue(r.get('description'))
            self.assertIn(r['kind'],('male','female','group','event'))
            self.assertGreaterEqual(len(r['steps']),2)
            for s in r['steps']:
                self.assertIn(s['place'],places)
                self.assertRegex(s['ref'],REF)
                self.assertTrue(s['title'])
                self.assertIn(s['icon'],('male','female','group'))

    def test_people_places_link_to_known_ids(self):
        ids={p['id'] for p in DATA['places']}
        for person,pids in DATA['personPlaces'].items():
            self.assertTrue(person)
            self.assertTrue(pids)
            self.assertTrue(set(pids).issubset(ids),(person,set(pids)-ids))

    def test_offline_entities(self):
        entities=json.loads((ROOT/'dados/enciclopedia_local.json').read_text(encoding='utf-8'))['data']
        self.assertTrue(all(isinstance(entities[x],list) for x in ('people','places','events')))
        self.assertGreaterEqual(sum(len(entities[x]) for x in entities),140)

if __name__=='__main__':unittest.main()
