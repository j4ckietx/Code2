var gif;
var selectedSize;
var data;

function selectorChangedEvent(e) {
  if (data) {
    gif.elt.src = data[selectedSize.value()].url;
  }
}

function myInputEvent(e) {
  var xhr=$.get("http://api.giphy.com/v1/gifs/translate?s=" + e.target.value + "&api_key=YGXVXgGJJw8y06vezB34ihBQJGtzzG7A&limit=1");

  // reset
  if (selectedSize) {
    selectedSize.remove();
  }
  selectedSize = createSelect();
  selectedSize.changed(selectorChangedEvent);

  xhr.done(function(response) {
    var keys = Object.keys(response.data.images);
    for (var i=0; i<keys.length; i++) {
      var key = keys[i];
      if (response.data.images[key].url && response.data.images[key].url.indexOf(".gif") !== -1) {
        selectedSize.option(key);
      }
    }
    data = response.data.images;
    gif.elt.src = response.data.images.fixed_height.url;
  });
}

function setup() {
  selectedSize = createSelect();
  var inp = createInput('');
  inp.input(myInputEvent);
  inp.size(1000,200);
  gif = createImg("https://media2.giphy.com/media/l0HU20BZ6LbSEITza/giphy-downsized.gif");
}
