var game;
var config;
var gifs = [];

function Square(value, x, y) {
  this.x = x;
  this.y = y;
  this.value = value;
  this.highlight = false;
  this.empty = false;

  this.draw = function(x, y, w, h) {
    if (this.empty) {
      fill(255,255,255);
      rect(x, y, w, h);
      return;
    }
    fill(255,255,255);
    var gif = gifs[this.value];
    if (gif) {
      image(gif, x, y, w, h);
    } else {
      rect(x, y, w, h);
    }
    if (this.highlight) {
      fill(255,255,255,100);
      rect(x, y, w, h);
    }
  }
}

function Chain() {
  this.list = [];
  this.push = function(obj) {
    if (!this.contains(obj)) {
      this.list.push(obj);
    }
    return this;
  }
  this.clear = function() {
    this.list = [];
    return this;
  }
  this.contains = function(obj) {
    return this.list.indexOf(obj) != -1;
  }
  this.remove = function(obj) {
    var index = this.list.indexOf(obj);
    if (index > -1) {
      this.list.splice(index, 1);
    }
  }
  this.isAdjacent = function(square) {
    if (this.list.length == 0) {
      return true;
    }
    for (var i=0; i<this.list.length; i++) {
      var c = this.list[i];
      var dx = Math.abs(c.x - square.x);
      var dy = Math.abs(c.y - square.y);
      if (dx <= 1 && dy <= 1) {
        return true;
      }
    }
    return false;
  }
  this.getLength = function() { return this.list.length; };
  this.forEach = function(cb) {
    for (var i=0; i<this.list.length; i++) {
      cb(this.list[i], i);
    }
  }
  this.matches = function() {
    if (this.list.length <= 0) {
      return false;
    }
    var firstValue = this.list[0].value;
    for (var i=0; i<this.list.length; i++) {
      if (this.list[i].value != firstValue) {
        return false;
      }
    }
    return true;
  }
}

function Game() {
  this.width = 10;
  this.height = 10;
  this.scale = 64;
  this.variation = 10;
  this.rows = [];
  this.chain = new Chain();

  this.init = function(width, height) {
    for (var y=0; y<this.height; y++) {
      var row = [];
      for (var x=0; x<this.width; x++) {
        var v = Math.floor(Math.random() * this.variation);
        var square = new Square(v, x, y);
        row.push(square);
      }
      this.rows.push(row);
    }
  }

  this.handleMousePressed = function() {

    var x = Math.floor((mouseX+(this.scale*0)) / this.scale);
    var y = Math.floor((mouseY+(this.scale*0)) / this.scale);

    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      var selectedSquare = this.rows[y][x];

      if (this.chain.contains(selectedSquare)) {
        this.chain.remove(selectedSquare);
        selectedSquare.highlight = false;
      } else {
        if (this.chain.isAdjacent(selectedSquare)) {
          this.chain.push(selectedSquare);
          selectedSquare.highlight = true;
        }
      }

      if (this.chain.getLength() >= 3) {
        console.log(this.chain.matches())
        if (this.chain.matches()) {
          this.chain.forEach(function (square, idx) {
            square.empty = true;
          })
        } else {
          this.chain.forEach(function (square) {
            square.highlight = false;
          })
        }
        this.chain.clear();
      }
    }

  }

  this.draw = function() {
    noStroke();
    for (var y=0; y<this.rows.length; y++) {
      var row = this.rows[y];
      for (var x=0; x < row.length; x++) {
        var square = row[x];
        var sx = x * this.scale;
        var sy = y * this.scale;
        var sw = this.scale;
        var sh = this.scale;
        square.draw(sx, sy, sw, sh);
      }
    }
  }

  this.init();
}

function preload() {
  config = loadJSON("config.json");
}

function myInputEvent(e) {
  config.searchTerm = e.target.value;
  loadGiphyData();
}

function loadGiphyData() {
  var url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + config.searchTerm;
  loadJSON(url, function(response) {
    for (var i=0; i<response.data.length; i++) {
      var gif = response.data[i];
      (function(j, g) {
        loadImage(g.images.fixed_height_small.url, function(img) {
          gifs[j] = img;
        });
      }) (i, gif);
    }
  });
}

function setup() {
  game = new Game();
  createCanvas(800, 800);
  var inp = createInput('');
  inp.input(myInputEvent);
  inp.size(100,100);
  loadGiphyData()
}

function draw() {
  game.draw();
}

function mousePressed() {
  game.handleMousePressed();
}
