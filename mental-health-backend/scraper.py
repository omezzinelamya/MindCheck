import requests
from bs4 import BeautifulSoup

def get_related_fact_sheets():
    url = "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    related_div = soup.find('div', id='PageContent_T0643CD2A003_Col01')
    fact_sheets = []

    base_url = 'https://www.who.int'

    if related_div:
        related_items = related_div.find_all('div', class_='related-item')
        for item in related_items:
            a_tag = item.find('a', class_='link-container')
            if not a_tag:
                continue

            href = a_tag.get('href')
            link_url = href if href.startswith('http') else base_url + href

            title_span = a_tag.find('span', class_='heading')
            title = title_span.get_text(strip=True) if title_span else "No title"

            # Try to get image from data-image attribute first
            img_div = a_tag.find('div', class_='background-image')
            img_url = None
            if img_div:
                img_url = img_div.get('data-image')
                if img_url and not img_url.startswith('http'):
                    img_url = base_url + img_url

                # If data-image not available, fallback to style attribute
                if not img_url:
                    style = img_div.get('style', '')
                    start = style.find('url("')
                    end = style.find('")', start)
                    if start != -1 and end != -1:
                        img_url = style[start + 5:end]
                        if img_url and not img_url.startswith('http'):
                            img_url = base_url + img_url

            fact_sheets.append({
                'title': title,
                'link': link_url,
                'image': img_url
            })

    return fact_sheets
