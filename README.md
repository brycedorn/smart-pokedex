# [Smart Pokédex](https://wiki.engr.illinois.edu/display/timan/Smart+Pokedex)
### A final project for CS410, Text Information Systems.
###### _What's that weird looking one with the tongue again?_

[![Analytics](https://ga-beacon.appspot.com/UA-40008117-10/smart-pokedex/home)](https://github.com/igrigorik/ga-beacon)

## Timeline

Todo:
 - Get lunr working with small amount of data
  - Keyword searching
   - Use tokenizer
  - List of results
  - Retrieve text from each Pokemon's wiki page
  - [x] Retrieve info from each Pokemon's entry in pokeapi

 - [x] Voice recognition for search
  - Just need to add javascript to enable
 
 - [x] Make template for pokemon result page
  - [x] Top result is returned if within threshold (>0.7 or so)

 - [x] Each pokemon should have a page (after searching for it)
  - [x] Populate with info from http://pokemondb.net/pokedex/{name}

## Installation

    bundle install

## Running app

    rake s

And that's it! [http://localhost:6969](http://localhost:6969).

## License

Copyright &copy; 2014 Bryce Dorn, Tedman Marszalek, The MIT License (MIT)