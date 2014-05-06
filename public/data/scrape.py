from bs4 import BeautifulSoup
import urllib2, json, re

# Global vars
base_url = "http://bulbapedia.bulbagarden.net"
header = {'User-Agent': 'Mozilla/5.0'}

# First we need to scrape for all pokemon URLs
poke_urls = []
list_url = "http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number"
req = urllib2.Request(list_url,headers=header)
page = urllib2.urlopen(req)
soup = BeautifulSoup(page)

tables = soup.findAll("table")
for table in tables:
  rows = table.findAll("tr")
  for row in rows:
    links = row.findAll("a",href=True)
    no_repeat = True
    for link in links:
      poke_url = link['href']
      if poke_url.find('(Pok%C3%A9mon)') > 0 & no_repeat:
        if no_repeat:
          poke_urls.append(poke_url)
        no_repeat = False

# print poke_urls
#Now iterate through those URLs and populate array of text corresponding to IDs

wiki_json = []
x = 0
for url in poke_urls:
  req = urllib2.Request(base_url+url,headers=header)
  page = urllib2.urlopen(req)
  soup = BeautifulSoup(page)
  soup.prettify();
  ugly_content = []

  content = soup.find("div", { "id" : "mw-content-text" })

  for row in content.findAll("p"):
    ugly_content += row

  ugly_tokens = str(ugly_content).split(' ')
  wiki_json.append(ugly_tokens)
  print ("========= "+url+" COMPLETE, MOVING ON TO POKEMON "+str(x)+ " ========")
  x += 1

with open('scrape.json', 'w') as outfile:
  json.dump(wiki_json, outfile)

open("scrape.js", "w").write("var wiki_data = " + open("scrape.json").read() + ";")