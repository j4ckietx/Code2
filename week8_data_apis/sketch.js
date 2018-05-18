var gif;

function myInputEvent(e) {
  var xhr=$.get("http://api.giphy.com/v1/gifs/translate?s=" + e.target.value + "&api_key=YGXVXgGJJw8y06vezB34ihBQJGtzzG7A&limit=1");
  xhr.done(function(response) {
    // console.log("success got data", data);
    gif.src = response.data.images.original.url;
  });
}

function setup() {
  createCanvas (1366, 768);
  var inp = createInput('');
  inp.input(myInputEvent);
  inp.size(1000,200);
  gif = createImg("https://media2.giphy.com/media/l0HU20BZ6LbSEITza/giphy-downsized.gif");
}

function draw() {
  background(0);
  if (gif) {
    gif.position(0, 0);
  }
}
