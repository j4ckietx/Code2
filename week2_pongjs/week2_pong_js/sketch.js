var f;
var mySound;

function preload() {
  f = loadFont('assets/NovaMono.ttf');
  soundFormats('mp3');
  mySound = loadSound('assets/bloop.mp3');
}

var Ball;

function Ball () {
  this.x = 500;
  this.y = 400;
  this.dirX = this.dirY = 1;
  this.speed = 3;
}

var Paddle;

function Paddle (x, y) {
  this.x = x;
  this.y = y;
  this.L = 100;
  this.up = this.down = false;
  this.point = 0;
}

var showMenu;
var winMenu;

function setup() {
    createCanvas(1000, 800);
    ball = new Ball();
    p1 = new Paddle(10, 370);
    p2 = new Paddle(980, 370);
    showMenu = true;
    winMenu = false;
}

function keyPressed() {
    if (keyCode === 87) {
        p1.up = true;
    }
    if (keyCode === 83) {
        p1.down = true;
    }
    if (keyCode === 32) {
        showMenu = false;
        winMenu = false;
        ball = new Ball();
        p1 = new Paddle(10, 370);
        p2 = new Paddle(980, 370);
    }
    if (keyCode === 8) {
        showMenu = true;
        winMenu = false;
        p1.point = p2.point = 0;
    }

        if (keyCode === UP_ARROW) {
            p2.up = true;
        }
        if (keyCode === DOWN_ARROW) {
            p2.down = true;
        }

}

function keyReleased() {
    if (keyCode === 87) {
        p1.up = false;
    }
    if (keyCode === 83) {
        p1.down = false;
    }
    if (keyCode === UP_ARROW) {
        p2.up = false;
    }
    if (keyCode === DOWN_ARROW) {
        p2.down = false;
    }
}

function draw() {
    background(20);
    fill(230);

    //line
    for (var dot = 0; dot < 40; dot++) {
        var dotx = 500;
        var doty = 20 * dot;
        rect(dotx, doty, 10, 10);
    }

    //score
    textFont(f, 50);
    text(p1.point, 412, 100);
    text(p2.point, 575, 100);

    if (p1.point >= 5 || p2.point >= 5) {
        winMenu = true;
    }

    //ball
    if (showMenu != true) {
        ball.x = ball.x + ball.dirX * ball.speed;
        ball.y = ball.y + ball.dirY * ball.speed;
    }
    if (ball.x >= 1000 - 10) {
        ball.x = 500;
        ball.y = 400;
        p1.point += 1;
        p2.L -= 20;
        mySound.play();
    }
    if (ball.x <= 0) {
        ball.x = 500;
        ball.y = 400;
        p2.point += 1;
        p1.L -= 20;
        mySound.play();
    }

    if (ball.y >= 800 - 10 || ball.y <= 0) {
        ball.dirY = -ball.dirY;
    }
    if (ball.x >= p2.x - 10 && ball.y <= p2.y + p2.L && ball.y >= p2.y) {
        ball.dirX = -abs(ball.dirX);
        ball.speed += 0.25;
    }
    if (ball.x <= p1.x + 10 && ball.y <= p1.y + p1.L && ball.y >= p1.y) {
        ball.dirX = abs(ball.dirX);
        ball.speed += 0.25;
    }
    fill(255, 243, 10);
    rect(ball.x, ball.y, 10, 10);



    //paddles
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

    fill(250);
    rect(p1.x, p1.y, 10, p1.L);
    rect(p2.x, p2.y, 10, p2.L);

    if (showMenu) {
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

    if (winMenu) {
        ball.x = 500;
        ball.y = 400;
        fill(255, 220, 18);
        rect(0, 0, 1000, 800);
        noStroke();
        fill(0);
          for (var dot = 0; dot < 40; dot++) {
          var dotx = 500;
          var doty = 20 * dot;
          rect(dotx, doty, 10, 10);
          }
        if (p1.point >= 5){
            textFont(f, 80);
            text("you win", 100, 200);
            textFont(f, 26);
            text("press [space] to restart", 80, 500);
            text("press [backspace] to quit", 80, 560);
        } else {
            textFont(f, 80);
            text("you win", 600, 200);
            textFont(f, 26);
            text("press [space] to restart", 550, 500);
            text("press [backspace] to quit", 550, 560);
        }
    }
}
