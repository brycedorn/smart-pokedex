import json, pykemon, re, os

data_json = []

for x in range(1, 718): # 778 pokemon
  data = pykemon.get(pokemon_id=int(x))
  data = json.dumps(data, default=lambda o: o.__dict__, sort_keys=True, indent=0)
  # Formatting
  data = str(x)+"\": {"+ data + "}"
  data_json.append(data)
  print ("========= POKEMON "+str(x)+" COMPLETE, MOVING ON ========")

with open('data.json', 'w') as outfile:
  json.dump(data_json, outfile)

# Hacky formatting :)
formatted = re.sub(r'\\n\\', '', open("data.json").read() )
formatted = re.sub(r'\\n', '', formatted )
formatted = re.sub(r'"{"', '', formatted )
formatted = re.sub(r'{{"', '{', formatted )
formatted = re.sub(r'\\"', '"', formatted )
formatted = re.sub(r'}",', '},{\n', formatted )
formatted = re.sub(r'\[', '{', formatted )
formatted = re.sub(r'"]', '}', formatted )
formatted = re.sub(r'}},{', '},', formatted )
formatted = re.sub(r'}}}', '}}', formatted )

open("data.js", "w").write("var poke_data = " + re.sub(r'abilities', '"abilities',formatted) +";")

os.remove("data.json")