// Array of key/value pairs for ID of pokemon
// poke_data = {"1": {"abilities": {"chloroph..."}}, ...

// Array of wiki jargon for ID of pokemon
// wiki_data = {"<a href="ehe">the pokemon</a>..."} , ...


// Index data in lunr
function local_storage(num_items) {

  var index = lunr(function () {
    this.field('api')
    this.field('wiki')
    this.ref('id')
  });

  // Populate index
  for(var i = 1; i < num_items; i++) {
    var formatted = lunr.tokenizer(wiki_data[i-1]);
    for(var j = 0; j < formatted.length; j++) {
      formatted[j] = lunr.trimmer(formatted[j]);
      formatted[j] = lunr.stemmer(formatted[j]);
    }
    index.add({
      id: i,
      wiki: poke_data[i],
      api: formatted
    });
  }
  return index;
}


// Button events
$(document).ready(function() {
  $("a#enter").click( function() {
    do_search(10);
  });
  $("a#more").click( function() {
    var size = 100;
    do_search(size);
  });
  $("a#download").click( function() {
    var d = local_storage(10);
    // $("h3#static").text( JSON.stringify( d.toJSON() ) );
    $("textarea#data").val( JSON.stringify( d.toJSON() ) );
  });
  $("a#copy").zclip({
    path:'http://davidwalsh.name/demo/ZeroClipboard.swf',
    copy:function(){return $("textarea#data").val();}
  });
});


// Fix this
// $(document).keypress(function(e) {
//   if(e.which == 13) {
//     do_search();
//   }
// });


// Pre-fetch for now
var index = local_storage(151);



// Search function
// Params : num_pokemon - the number of pokemon to add to lunr index
function do_search(num_pokemon) {

  // Load locally serialized index
  // `test` is full lunr index, `sm` is partition of 30
  // var index = lunr.Index.load(sm);

  // Do the search
  var query = $("#search").val();

  // If query exists
  if(query) {
    console.log("Query: " + query);
    var result = index.search(query);

    // If results exist
    if(result[0]) {
      console.log("Result index: " + result[0].ref);

      // Show results for Pokemon with id = ref
      $("#result").css('display','block');

      console.log("Result set: ");
      console.log(result);

      var pokemon = poke_data[result[0].ref];

      console.log("Selected: ");
      console.log(pokemon);

      // Display stats
      $("#ret_name").text(pokemon.name);
      $("#ret_acc").text("with "+result[0].score.toString().substring(0, 7)+" accuracy");
      $("#ret_img").attr('src','http://img.pokemondb.net/artwork/'+pokemon.name.toLowerCase()+'.jpg');
      var display_id = (pokemon.id < 100) ? "0"+pokemon.id : pokemon.id;
      if(pokemon.id < 10) display_id = "0"+display_id;
      $($("#ret_stats").find("td")[1]).text(display_id);
      var display_types = [];
      $.map( pokemon.types, function( val, i ) {
        display_types += i.toString() + ", ";
      });
      $($("#ret_stats").find("td")[3]).text(display_types.substring(0,display_types.length-2));
      $($("#ret_stats").find("td")[5]).text(pokemon.hp);
      $($("#ret_stats").find("td")[7]).text(pokemon.height/10 + "m");
      $($("#ret_stats").find("td")[9]).text(pokemon.weight/10 + "kg");

      // Display runner-up stats
      for(var k = 1; k < result.length; k++ ) {
        if(result[k]) {
          $("#run_"+k).find(".pokeimg img").attr('src','http://img.pokemondb.net/artwork/'+poke_data[result[k].ref].name.toLowerCase()+'.jpg');
          $("#run_"+k).find("p.name").text(poke_data[result[k].ref].name);
          $("#run_"+k).find("p.accuracy").text(result[k].score.toString().substring(0, 7)+" accuracy");
        }
      }
    } else alert('No results, try wording again!');  
  } else alert('You need enter something to search for first!');
}