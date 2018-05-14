// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 5
// saving/loading paint data
// based on example by Jon Beilin

var paintmarks = [];
var paintDataFile = 'paintData.json';
var r = 255;
var g = 0;
var b = 0;
var d = 10;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  for (var i = 0; i < paintmarks.length; i++) {
    paintmarks[i].display();
  }

  fill(0);
  textSize(24);
  text("drag the mouse across the canvas to draw.", 50, 570);
  text("press 'S' to save a json file with the current paint data.", 50, 600);
  text("press 'L' to load a json file from your computer.", 50, 630);
  text("press 'C' to change the color of the paint.", 50, 660);
  text("press '1/2/3' to change the size of the paint.", 50, 690);
}

function PaintMark(position,r,g,b,d) {
  this.position = position;
  this.r = r;
  this.g = g;
  this.b = b;
  this.d = d;

  this.display = function() {
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.position.x, this.position.y, d, d);
  }

}

function mouseDragged() {
  paintmarks.push(new PaintMark(createVector(mouseX, mouseY),r,g,b,d));
}

function keyPressed() {
  if (key === 'S') {
    savePaintData();
  }
  if (key === 'L') {
    loadPaintData();
  }
  if (key === 'C') {
    r = Math.floor((Math.random() * 255));
    g = Math.floor((Math.random() * 255) + 10);
    b = Math.floor((Math.random() * 255) + 0);
  }
  if (key === '1') {
    d = 10;
  }
  if (key === '2') {
    d = 20;
  }
  if (key === '3') {
    d = 30;
  }
}

function savePaintData() {
  positionsToSave = [];
  for (var i = 0; i < paintmarks.length; i++) {
    positionsToSave.push(
      {
        x: paintmarks[i].position.x,
        y: paintmarks[i].position.y,
        r: paintmarks[i].r,
        b: paintmarks[i].b,
        g: paintmarks[i].g,
        d: paintmarks[i].d
      }
    );
  }
  saveJSON(positionsToSave, 'paintData.json');
}

function loadPaintData() {
  loadJSON(paintDataFile, parsePaintData);
}

function parsePaintData(data) {
  paintmarks = [];

  for (var i = 0; i < data.length; i++) {
    paintmarks.push(new PaintMark(createVector(data[i].x, data[i].y),data[i].r,data[i].g,data[i].b,data[i].d));
  }
}
