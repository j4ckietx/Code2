var sceneData;

var currentScene = 0;
var scenes = [];
var images = [];

function preload() {
  sceneData = loadJSON('scenes.json');
}

function setup() {
  createCanvas(800, 800);
  CreateScenesFromData(sceneData.scenes);

  for (var i=0; i<sceneData.scenes.length; i++) {
    (function(j) {
      loadImage(sceneData.scenes[j].image, function(img) {
        images[j] = img;
      });
    }) (i);
  }
}

function draw() {
  var scene = scenes[currentScene];
  background(0);

  if (images[currentScene]) {
    image(images[currentScene], 0, 0, width, height);
  }

  fill(0);
  noStroke();
  rect(0,0,width,400);

  scenes[currentScene].display();

  fill(255);
  textSize(24);
  text("press the option number to advance to the indicated scene", 50, 700);
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].options, data[i].nextScenes, data[i].loadedImage))
  }
}

function Scene(sceneText, options, nextScenes, image) {
  this.sceneText = sceneText;
  this.options = options;
  this.nextScenes = nextScenes;
  this.image = image;

  this.display = function() {
    fill(255);
    textSize(28);
    text(this.sceneText, 100, 100);

    for (var i = 0; i < options.length; i++) {
      text('OPTION ' + (i + 1) + ': ' + this.options[i], 150, 200 + i * 50);
    }
  }
}

function keyPressed() {
  var numberPressed = parseInt(key);
  var newScene = scenes[currentScene].nextScenes[numberPressed - 1];
  if (newScene !== undefined) {
    currentScene = newScene;
  }
}
