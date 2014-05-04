import json, pykemon, jsonpickle

data_json = []

for x in range(1, 10): # 778 pokemon
  data = pykemon.get(pokemon_id=int(x))
  pickled = jsonpickle.encode(data)
  data_json.append(pickled)

with open('data.json', 'w') as outfile:
  json.dump(data_json, outfile)