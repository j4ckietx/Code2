var gif;
var direction = 180;

function setup() {
  createCanvas(1400, 400);
  gif = createSprite(1370, 100, 0, 0);
  gif.addAnimation('floating', './assets/circled-dot.png');
}

function myInputEvent(e) {
  var xhr=$.get("http://api.giphy.com/v1/gifs/search?q=" + e.target.value + "&api_key=YGXVXgGJJw8y06vezB34ihBQJGtzzG7A&limit=100");
  xhr.done(function(response) {
    gif.elt.src = response.data.images.fixed_height.url;
  });
}

function draw() {
  background(0);
  gif.setSpeed(-2, 0);
  drawSprites();
}
