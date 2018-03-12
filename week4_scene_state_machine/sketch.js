var f;
var mySound;
var balls;
var numberOfBalls = 1;
var colliders;

var keyz = {
    "W": 87,
    "S": 83,
    "SPACE": 32,
    "BACKSPACE": 8
};

var state = {
    "MENU": 0,
    "WIN": 1,
    "GAME_1": 2,
    "GAME_2": 3,
    "GAME_3": 4,
}

var currentState;

function Collider() {
    this.pos = createVector(0, 0);
    this.width = 25;
    this.height = 25;
    this.time = 0;

    this.update = function() {
        this.time += .03;
        this.pos.x = (200*sin(this.time)) + (width/2)
        this.pos.y = (200*cos(this.time)) + (height/2)
    }

    this.display = function(){
        rect(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
    }

    this.collided = function(other){
        colliders.push(new Collider());
    }
}

function Ball (dir, speed) {
    this.original_dir = dir;
    this.original_speed = speed;
    this.x = 500;
    this.y = 400;
    this.dirX = this.dirY = dir;
    this.speed = speed;
    this.active = true;
    this.width = 10;
    this.height = 10;

    this.update = function() {
        if (this.active) {
            this.x = this.x + this.dirX * this.speed;
            this.y = this.y + this.dirY * this.speed;
        }
        //fall off right side
        if (this.x >= 1000 - 10) {
            this.hit();
            p1.point += 1;
            p2.L -= 5;
        }
        // left side
        if (this.x <= 0) {
            this.hit();
            p2.point += 1;
            p1.L -= 5;
        }
        //hit walls
        if (this.y >= 800 - 10 || this.y <= 0) {
            this.dirY = -this.dirY;
        }
        //hit paddle
        if (this.x >= p2.x - 10 && this.y <= p2.y + p2.L && this.y >= p2.y) {
            this.dirX = -abs(this.dirX);
            this.speed += 0.25;
        }
        if (this.x <= p1.x + 10 && this.y <= p1.y + p1.L && this.y >= p1.y) {
            this.dirX = abs(this.dirX);
            this.speed += 0.25;
        }
        //this visual
        if (this.active) {
            fill(255, 243, 10);
            rect(this.x, this.y, 10, 10);
        }
    }

    this.hit = function() {
        this.center();
        this.speed += 0.5;
        mySound.play();
    }
    this.center = function() {
        this.x = 500;
        this.y = 400;
    }
    this.reset = function() {
        this.center();
        this.dirX = this.dirY = this.original_dir;
        this.speed = this.original_speed;
    };
}

function Paddle (x, y) {
    this.x = x;
    this.y = y;
    this.L = 100;
    this.up = this.down = false;
    this.point = 0;
    this.wins = false;
    this.draw = function() {
        fill(250);
        rect(this.x, this.y, 10, this.L);
    }
}

function preload() {
    f = loadFont('assets/NovaMono.ttf');
    soundFormats('mp3');
    mySound = loadSound('assets/bloop.mp3');
}

function setup() {
    createCanvas(1000, 800);
    balls = [new Ball(1, 2.5),new Ball(-1,3.5)];
    p1 = new Paddle(10, 370);
    p2 = new Paddle(980, 370);
    colliders = [new Collider()];
    currentState = state.MENU;
}

function keyPressed() {
    switch (keyCode) {
        case keyz.W:
            p1.up = true;
            break;

        case keyz.S:
            p1.down = true;
            break;

        case keyz.SPACE:
            ball1 = new Ball(1, 2.5);
            ball2 = new Ball(-1, 3.5);
            p1 = new Paddle(10, 370);
            p2 = new Paddle(980, 370);
            currentState = state.GAME_1;
            break;

        case keyz.BACKSPACE:
            p1.point = p2.point = 0;
            currentState = state.MENU;
            break;

        case UP_ARROW:
            p2.up = true;
            break;

        case DOWN_ARROW:
            p2.down = true;
            break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case keyz.W:
            p1.up = false;
            break;

        case keyz.S:
            p1.down = false;
            break;

        case UP_ARROW:
            p2.up = false;
            break;

        case DOWN_ARROW:
            p2.down = false;
            break;
    }
}

function drawLine() {
    for (var dot = 0; dot < 40; dot++) {
        var dotx = 500;
        var doty = 20 * dot;
        rect(dotx, doty, 10, 10);
    }
}

function drawBackground() {
    background(20);
    fill(230);
    drawLine();
    //score count
    textFont(f, 50);
    text(p1.point, 412, 100);
    text(p2.point, 575, 100);
}

function drawMenu() {
    fill(20);
    rect(0, 0, 1000, 800);
    fill(250);
    textFont(f, 32);
    text("pong game", 50, 50);
    text("player 1: [q] / [a] to move", 50, 120);
    text("player 2: [up] / [down] to move", 50, 190);
    text("press [space] to start", 50, 330);
    text("press [backspace] to quit", 50, 400);
}

function drawWin(player) {
    var winX1 = 100;
    var winX2 = 600;
    var textX1 = 80;
    var textX2 = 550;
    var winX;
    var textX;
    if (player == 1) {
        winX = winX1;
        textX = textX1;
    } else {
        winX = winX2;
        textX = textX2;
    }
    fill(255, 220, 18);
    rect(0, 0, 1000, 800);
    noStroke();
    fill(0);
    drawLine();
    textFont(f, 80);
    text("you win", winX, 200);
    textFont(f, 26);
    text("press [space] to restart", textX, 500);
    text("press [backspace] to quit", textX, 560);
}

function drawGameWin() {

    if (p1.wins) {
        drawWin(1)
    }
    if (p2.wins) {
        drawWin(2)
    }
}

function updateColliders() {
    for (var i=0; i<colliders.length; i++) {
        var c = colliders[i];
        c.update();
        c.display();
        for (var j=0; j<numberOfBalls; j++) {
            var b = balls[j];
            if (b.x + b.width/2 > c.pos.x &&
                b.x + b.width/2 < c.pos.x + c.width &&
                b.y + b.height/2 > c.pos.y &&
                b.y + b.height/2 < c.pos.y + c.height) {
                c.collided(b);
            }
        }
    }
}

function updateGame() {
    for (var i=0; i<numberOfBalls; i++) {
        balls[i].update();
    }
    //paddles move
    if (p1.up === true) {
        p1.y -= 8;
    } else if (p1.down === true) {
        p1.y += 8;
    }
    if (p2.up === true) {
        p2.y -= 8;
    } else if (p2.down === true) {
        p2.y += 8;
    }
    if (p1.y >= 800 - p1.L) {
        p1.y = 800 - p1.L;
    } else if (p1.y <= 0) {
        p1.y = 0;
    }
    if (p2.y >= 800 - p2.L) {
        p2.y = 800 - p2.L;
    } else if (p2.y <= 0) {
        p2.y = 0;
    }
    if (p1.point >= 20) {
        p1.wins = true;
        currentState = state.WIN;
    }
    if (p2.point >= 20) {
        p2.wins = true;
        currentState = state.WIN;
    }
}

function drawGame() {
    drawBackground();
    p1.draw();
    p2.draw()
    updateGame();
}

function draw() {
    switch (currentState) {
        case state.MENU:
            numberOfBalls = 1;
            for (var i=0; i<balls.length; i++) {
                balls[i].reset();
            }
            drawMenu();
            break;
        case state.WIN:
            numberOfBalls = 1;
            for (var i=0; i<balls.length; i++) {
                balls[i].reset();
            }
            drawGameWin();
            break;
        case state.GAME_1:
            numberOfBalls = 1;
            if (p1.point > 1 || p2.point > 1) {
                currentState = state.GAME_2;
            }
            drawGame();
            break;
        case state.GAME_2:
            numberOfBalls = 2;
            if (p1.point > 2 || p2.point > 2) {
                currentState = state.GAME_3;
            }
            drawGame();
            break;
        case state.GAME_3:
            numberOfBalls = 2;
            drawGame();
            updateColliders();
            break;
    }
}
