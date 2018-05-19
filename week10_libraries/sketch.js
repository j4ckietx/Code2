var sprites = [];

function loadGifs(searchTerm, doneLoading) {
  var limit = 25;
  var url = (
    "https://api.giphy.com/v1/gifs/search?q="
    + searchTerm
    + "&api_key=YGXVXgGJJw8y06vezB34ihBQJGtzzG7A&limit="
    + limit
  )
  var xhr = $.get(url);
  var loadedGifs = [];
  xhr.done(function(response) {
    for (var i=0; i<response.data.length; i++) {
      var gif = response.data[i];
      (function(_i, _gif) {
        loadImage(_gif.images.fixed_height.url, function(img) {
          loadedGifs.push(img);
          if (loadedGifs.length == limit) {
            doneLoading(response, loadedGifs);
          }
        });
      }) (i, gif);
    }
  });
}

function handleLoadedGifs(response, loadedGifs) {
  // delete all the current sprites
  for (var i=0; i<sprites.length; i++) {
    sprites[i].remove();
  }
  sprites = [];

  // create new sprites
  var offset = (
    response.data.length > 0
    ? (parseInt(response.data[0].images.fixed_height.width)/2 + 100)
    : 0
  );

  for (var i=0; i<response.data.length; i++) {

    // image url
    var url = response.data[i].images.fixed_height.url;

    // create new sprite
    var newSprite = createSprite(0, 200);
    newSprite.addAnimation('floating', loadedGifs[i]);
    newSprite.setSpeed(-1, 0);
    newSprite.debug = true;
    newSprite.position.x += offset;

    // calculate offset
    offset += (
      (parseInt(response.data[i].images.fixed_height.width) / 2) +
      (
        (i < response.data.length-1)
        ? (parseInt(response.data[i+1].images.fixed_height.width) / 2)
        : 0
      ) + 20
    );

    sprites.push(newSprite);
  }
}

function keyReleased() {
  if (keyCode == 13) {
    loadGifs(lastSearchTerm, handleLoadedGifs);
  }
}

var lastSearchTerm = "";
function myInputEvent(e) {
  lastSearchTerm = e.target.value;
}

function setup() {
  createCanvas(2000, 400);
  var inp = createInput('');
  inp.input(myInputEvent);
  inp.size(1000,200);
}

function draw() {
  background(0);
  drawSprites();
}
