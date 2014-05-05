# [Smart Pokédex](https://wiki.engr.illinois.edu/display/timan/Smart+Pokedex)
### A final project for CS410, Text Information Systems.
###### _What's that weird looking one with the tongue again?_

[![Analytics](https://ga-beacon.appspot.com/UA-40008117-10/smart-pokedex/home)](https://github.com/igrigorik/ga-beacon)

## Timeline

Todo:
 - Get lunr working with small amount of data
  - Keyword searching
  - List of results
  - Retrieve text from each Pokemon's wiki page
  - [x] Retrieve info from each Pokemon's entry in pokeapi

 - Voice recognition for search
  - https://www.talater.com/annyang/
 
 - Make template for pokemon result page
  - Top result is returned if within threshold (>0.7 or so)

 - Each pokemon should have a page (after searching for it)
  - Populate with info from http://pokemondb.net/pokedex/{name}

## Installation

    bundle install

## Running app

Start the app by running:

    rake s

This rake command runs `bundle exec shotgun config.ru` behind the scenes for you and starts the app on port 6969 and will now be able to view the application in your web browser at this URL [http://localhost:6969](http://localhost:6969).

## Rake Tasks

    rake -T

    rake css:clear         # Clear the CSS
    rake css:compile       # Compile CSS
    rake css:compile:prod  # Compile CSS for production
    rake s                 # Run the app

## License

Copyright &copy; 2014 Bryce Dorn, Tedman Marszalek, The MIT License (MIT)