// Index data in lunr
var index = lunr(function () {
  this.field('name')
  this.field('body')
  // Add other values for things
  this.ref('id')
});

index.add({
  id: 1,
  title: 'Bulbasaur',
  body: 'green seed thing'
});

index.add({
  id: 2,
  title: 'Charmander',
  body: 'fire red'
});

// On click 'search'
$(document).ready(function() {
  $("a#enter").click( function() {
    do_search();
  });
});

$(document).keypress(function(e) {
  if(e.which == 13) {
    do_search();
  }
});

function do_search() {

  // Do the search
  var query = $("#search").val();

  if(query) {
    console.log("Query: " + query);
    var result = index.search(query);
    console.log("Result index: " + result[0].ref);

    // Show results for Pokemon with id = ref
    $("#result").css('display','block');
    console.log(result);
    var pokemon = poke_data[result[0].ref];
    console.log(pokemon);
    $("#ret_name").text(pokemon.name);
    $("#ret_acc").text("with "+result[0].score.toString().substring(0, 5)+" accuracy");

    $("#ret_img").attr('src','http://img.pokemondb.net/artwork/'+pokemon.name.toLowerCase()+'.jpg');
    var display_id = (pokemon.id < 100) ? "0"+pokemon.id : pokemon.id;
    if(pokemon.id < 10) display_id = "0"+display_id;
    $($("#ret_stats").find("td")[1]).text(display_id);
    var display_types = [];
    $.map( pokemon.types, function( val, i ) {
      // display_types += i.capitalize();
      display_types += i.toString() + ", ";
    });
    $($("#ret_stats").find("td")[3]).text(display_types.substring(0,display_types.length-2));
    $($("#ret_stats").find("td")[5]).text(pokemon.hp);
    $($("#ret_stats").find("td")[7]).text(pokemon.height/10 + "m");
    $($("#ret_stats").find("td")[9]).text(pokemon.weight/10 + "kg");
  }
  else { // Query empty
    alert('You need enter something to search for first!');
  }

}























