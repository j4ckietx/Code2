// code 2
// section a
// bfa dt
// spring 2018
// bryan ma

// week 5
// choose your own adventure data

// scene data model:

// {
//   sceneText: '', //the scene text
//   options: [], // the text options to choose
//   nextScenes: []  // the target scene based on the previous options
// }

var sceneData;

var currentScene = 0;
var scenes = [];

function preload() {
  sceneData = {
    "scenes": [
      {
        "sceneText": "This is scene 0",
        "options": ["go to scene 1"],
        "nextScenes": [1]
      },
      {
        "sceneText": "This is scene 1",
        "options": ["go to scene 2", "go to scene 3"],
        "nextScenes": [2, 3]
      },
      {
        "sceneText": "This is scene 2",
        "options": ["go to scene 3", "go to scene 4"],
        "nextScenes": [3, 4]
      },
      {
        "sceneText": "This is scene 3",
        "options": ["go to scene 4", "go to scene 0"],
        "nextScenes": [4, 0]
      },
      {
        "sceneText": "This is scene 4",
        "options": ["go to scene 0", "go to scene 1", "go to scene 2", "go to scene 3"],
        "nextScenes": [0, 1, 2, 3]
      }
    ]
  }
;
}

function setup() {
  createCanvas(800, 800);
  CreateScenesFromData(sceneData.scenes);
}

function draw() {
  background(231, 190, 150);
  scenes[currentScene].display();

  fill(0);
  textSize(24);
  text("press the option number to advance to the indicated scene", 50, 700);
}

function CreateScenesFromData(data) {
  for (var i = 0; i < data.length; i++) {
    scenes.push(new Scene(data[i].sceneText, data[i].options, data[i].nextScenes))
  }
}

function Scene(sceneText, options, nextScenes) {
  this.sceneText = sceneText;
  this.options = options;
  this.nextScenes = nextScenes;

  this.display = function() {
    fill(0);
    textSize(32);
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
