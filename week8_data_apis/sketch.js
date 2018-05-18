var gif;

function myInputEvent(e) {
  var xhr=$.get("https://api.giphy.com/v1/gifs/translate?s=" + e.target.value + "&api_key=YGXVXgGJJw8y06vezB34ihBQJGtzzG7A&limit=1");
  xhr.done(function(response) {
    gif.elt.src = response.data.images.fixed_height.url;
  });
}

function setup() {
  var inp = createInput('');
  inp.input(myInputEvent);
  inp.size(1000,200);
  gif = createImg("https://media2.giphy.com/media/l0HU20BZ6LbSEITza/giphy-downsized.gif");
}
