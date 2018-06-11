// query Giphy for "The Office", g rated, 10 results
var queryURL = "https://api.giphy.com/v1/gifs/search?q=the+office&limit=10&rating=g&api_key=dc6zaTOxFJmzC";
var gifArray = [];

// #giflist from HTML is stored in variable container
var container = document.getElementById('giflist');
// create document fragment so changes don't affect whole document and have to draw page over again
var docFrag = document.createDocumentFragment();

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  for (i = 0; i < 10; i ++)
  {
    // add elements to array using url property from query
    gifArray.push(response.data[i].images.original.url);
    console.log(response.data[i].images.original.url);

    // when array reaches length of 10
    if (gifArray.length >= 10) {
      // for each element in gifArray
    gifArray.forEach(function(url) {
        // create image element in document
        var img = document.createElement('img');
        // href for new img element points to current element > gifarray[0] - [9]
        img.src = url;
        // add correctly directed image to document fragment's end
        docFrag.appendChild(img);
    });
    // add fully populated document fragment to container or #giflist
    container.appendChild(docFrag);
  }
}
});
