// query Giphy for "The Office", g rated, 10 results
var queryURL = "https://api.giphy.com/v1/gifs/search?q=the+office&limit=10&rating=g&api_key=dc6zaTOxFJmzC";
var gifArray = [];
var stillArray = [];
var queries = ["Eagle", "Condor", "Hawk", "Pigeon", "Pink Flamingo", "Ostrich"];


// #giflist from HTML is stored in variable container
var container = document.getElementById('gifList');
// create document fragment so changes don't affect whole document and have to draw page over again
var docFrag = document.createDocumentFragment();

$(document).ready(function() {

  renderButtons();

  $(document).on('click', '.query-btn', PopulateGifs);
  $(document).on('click', '#gifList', StartStopGif);

  function ClearGifs() {
    $("#gifList").empty();
    gifArray = [];
    stillArray = [];
  };

  function StartStopGif() {
    if ($(this).find("img").attr("data-state") == "moving") {
      $(this).find("img").attr("src", "stillArray");
    } else {
      $(this).find("img").attr("src", response.data[i].images.original_still.url);
    }
  };


  function PopulateGifs() {
    // clear gif div
    ClearGifs();

    // take string from data-name attribute of button, replaces spaces with +
    var queryTerm = $(this).attr('data-name').replace(/ /g, '+');

    // returns 3 gifs
    var rateLimit = 3;
    var giphyKey = "dc6zaTOxFJmzC"; // Giphy public API key
    // concatenate variables and strings for API query
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&limit=" + rateLimit + "&api_key=" + giphyKey;


    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      for (i = 0; i < rateLimit; i++) {
        // add elements to array using url property from query
        gifArray.push(response.data[i].images.original.url);
        stillArray.push(response.data[i].images.original_still.url);

      }
      // when array reaches rate limit
      if (gifArray.length >= rateLimit) {
        // for each element in gifArray
        gifArray.forEach(function(url) {
          // create image element in document
          var img = document.createElement('img');
          // href for new img element points to current element > gifarray[0] - [9]
          img.src = url;
          img.attr= "moving";
          // add correctly directed image to document fragment's end
          docFrag.appendChild(img);
        });
        // add fully populated document fragment to container or #gifList
        container.appendChild(docFrag);
      }
      StartStopGif();
    });
  };

  function renderButtons() {
    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#queryList").empty();

    // Loops through the array of movies
    for (var i = 0; i < queries.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("query-btn btn btn-outline-info btn-lg");
      // Added a data-attribute
      a.attr("data-name", queries[i]);
      // Provided the initial button text
      a.text(queries[i]);
      // Added the button to the buttons-view div
      $("#queryList").append(a);
    }
  };

  $("#add-gif-query").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gifTerm = $("#queryInput").val().trim();

    // The movie from the textbox is then added to our array
    queries.push(gifTerm);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });
});
