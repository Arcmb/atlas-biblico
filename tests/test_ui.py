"""Teste de fumaça local. pip install playwright; python -m playwright install chromium"""
from pathlib import Path
import re
import shutil
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
def inline_html(path):
    html=(ROOT/path).read_text(encoding='utf8')
    html=re.sub(r'<link rel="stylesheet" href="([^"]+)">',lambda m:'<style>'+ (ROOT/m.group(1)).read_text(encoding='utf8')+'</style>',html)
    html=re.sub(r'<script src="([^"]+)"></script>',lambda m:'<script>'+ (ROOT/m.group(1)).read_text(encoding='utf8').replace('</script','<\\/script')+'</script>',html)
    return html

def main():
    with sync_playwright() as p:
        browser_path=shutil.which('chromium') or shutil.which('google-chrome') or shutil.which('msedge')
        opts={'executable_path':browser_path} if browser_path else {}
        browser=p.chromium.launch(headless=True,args=['--no-sandbox'],**opts)
        for width,height in [(1600,960),(430,920)]:
            page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
            errors=[]
            page.on('pageerror',lambda ex:errors.append(str(ex)))
            page.set_content(inline_html('atlas.html'),wait_until='load')
            page.screenshot(path=str(ROOT/'tests'/f'atlas_{width}.png'),full_page=True)
            title=page.locator('#journeyTitle').inner_text(); count=page.locator('.timeline-step').count()
            print(width,'atlas',title,'timeline steps',count,'SVG land areas',page.locator('#mapGraphics .land').count(),'errors',errors)
            assert count==11
            assert page.locator('#mapSymbols .map-geo-dot').count()>0
            if width==1600:
                page.locator('#nextBtn').click()
                assert page.locator('#stepTitle').inner_text()=='Fuga para o Egito'
                page.locator('button[data-category="povos"]').click()
                print('povos',page.locator('#journeyTitle').inner_text())
                assert 'Êxodo' in page.locator('#journeyTitle').inner_text()
                page.locator('#entitySearch').fill('Rute')
                page.locator('#searchResults button').first.click()
                print('search Rute',page.locator('#bioTitle').inner_text(),page.locator('#journeyTitle').inner_text())
                assert 'Rute' in page.locator('#bioTitle').inner_text()
                page.locator('#mapSymbols .map-geo-dot').first.click()
                print('place modal',page.locator('#placeModal').get_attribute('class'))
                assert 'open' in page.locator('#placeModal').get_attribute('class')
                page.locator('#closeModal').click()
                page.locator('#zoomIn').click()
                page.locator('#playBtn').click()
                page.wait_for_timeout(600)
                print('animated value',page.locator('#storySlider').input_value())
                page.locator('#playBtn').click()
            assert not errors,(width,errors)
            page.close()
        page=browser.new_page(viewport={'width':1600,'height':900})
        errors=[]
        page.on('pageerror',lambda ex: errors.append(str(ex)))
        page.set_content(inline_html('index.html'),wait_until='load')
        page.screenshot(path=str(ROOT/'tests'/'conexoes_original.png'),full_page=False)
        print('index links',page.locator('a[href="atlas.html"]').count(),'errors',errors)
        assert page.locator('a[href="atlas.html"]').count()>=1
        assert not errors
        browser.close()

if __name__=='__main__':main()
