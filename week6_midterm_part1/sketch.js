//Midterm Requirements
//OOP P5.js
//State Management
//Externalizing data
//Project Description

//The experience of the project will be to have a minimal amount of
//instructions for the user’s actions. The goal for the user is to
//deduce the way to proceed in the game based on the graphics on the
//screen, using only common keyboard shortcuts and action.


// var f;
// var mySound;

var game1Win = false;
var game2Win = false;
var life = 5;

var state = {
    "MENU": 0,
    "LEVEL_UP": 1,
    "GAME_1": 2, //1 input
    "GAME_2": 3, //3 input
    "GAME_3": 4, //5 input
    "WIN": 5,
}

var currentState = state.MENU;

// function preload() {
//     f = loadFont('assets/NovaMono.ttf');
//     soundFormats('mp3');
//     mySound = loadSound('assets/bloop.mp3');
// }

function setup() {
    createCanvas(800, 800);
}

function drawMenu() {
    //menu visuals and instructions
    //keyreleased for game start
}

function drawLevelMenu() {
    background (#EFEFEF);
    fill(#E24E42);
    textFont(f, 50);
    text("LEVEL UP", 400, 200);

}

function drawWinMenu() {
    //win menu visuals and texts
    //keyreleased for back to menu
}

//Gameplay function data externalized
function keyreleased(){
    switch (keyCode) {
        //key detections for gameplay
    }
}

function gamePlay(){
    //...
}

function draw() {
    switch (currentState) {
        case state.MENU:
            drawMenu();
            game1Win = game2Win = false;
            break;
        case state.LEVEL_UP:
            drawLevelMenu();
            if (game2Win) {
                life = 5;
                currentState = state.GAME_3;
            } else if (game1Win) {
                life = 5;
                currentState = state.GAME_2;
            }
            break;
        case state.GAME_1:
            if (/*check for game 1 result win;*/) {
                game1Win = true;
                currentState = state.LEVEL_UP;
            } else if (/*check for game 1 result lose;*/){
                life -= 1;
                if (life != 0) {
                    currentState = state.GAME_1;
                } else {
                    currentState = state.Menu;
                }

            }
            break;
        case state.GAME_2;
            if (/*check for game 2 result win;*/) {
                game2Win = true;
                currentState = state.LEVEL_UP;
            } else if (/*check for game 2 result lose;*/){
                life -= 1;
                if (life != 0) {
                    currentState = state.GAME_2;
                } else {
                    currentState = state.Menu;
                }
            }
            break;
        case state.GAME_3;
            if (/*check for game 3 result win;*/) {
                currentState = state.WIN;
            } else if (/*check for game 1 result lose;*/){
                life -= 1;
                if (life != 0) {
                    currentState = state.GAME_3;
                } else {
                    currentState = state.Menu;
                }
            }
            break;
        case state.WIN;
            drawWinMenu();
    }
}
