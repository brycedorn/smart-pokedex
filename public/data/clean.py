import json, re, os

# Attempting to sanitize scraped text
data = open("test.html").read()

with open('test.js', 'w') as outfile:
  outfile.write(data)
