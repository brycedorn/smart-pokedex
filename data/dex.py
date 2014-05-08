from bs4 import BeautifulSoup
import urllib2, json, re, os

# Global vars
base_url = "http://pokemondb.net"
header = {'User-Agent': 'Mozilla/5.0'}

# First we need to scrape for all pokemon URLs
dex_urls = []
list_url = "http://pokemondb.net/pokedex/all"
req = urllib2.Request(list_url,headers=header)
page = urllib2.urlopen(req)
soup = BeautifulSoup(page)

links = soup.findAll("a", { "class" : "ent-name" })
for link in links:
  dex_url = link['href']
  dex_urls.append(dex_url)

#Now iterate through those URLs and populate array of text corresponding to IDs

dex_json = []
x = 0
for url in range(718):
  req = urllib2.Request(base_url+dex_urls[url],headers=header)
  page = urllib2.urlopen(req)
  soup = BeautifulSoup(page)
  soup.prettify();
  ugly_content = []

  # Works for pokemon 2, but not for 1
  branch = False
  content = soup.findAll("table", { "class" : "vitals-table" })[len(soup.findAll("table", { "class" : "vitals-table" }))-1]
  if(len(content.findAll("a")) >= 3):
    branch = True
    content = soup.findAll("table", { "class" : "vitals-table" })[len(soup.findAll("table", { "class" : "vitals-table" }))-2]

  for entry in content.findAll("td"):
    ugly_content += entry
    print entry

  ugly_tokens = str(ugly_content).split(' ')
  dex_json.append(ugly_tokens)
  print ("========= "+dex_urls[url]+" COMPLETE, BRANCH: "+str(branch)+", MOVING ON TO POKEMON "+str(x)+ " ========")
  print
  x += 1

with open('dex.json', 'w') as outfile:
  json.dump(dex_json, outfile)

open("dex.js", "w").write("var dex_data = " + open("dex.json").read() + ";")

os.remove("dex.json")