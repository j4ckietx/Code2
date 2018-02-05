import processing.sound.*;

class Ball {
  float x;
  float y;
  int dirX;
  int dirY;
  float speed;
  
  Ball () {
    this.x = 500;
    this.y = 400;
    this.dirX = this.dirY = 1;
    this.speed = 3;
  }
}

Ball ball = new Ball();

class Paddle {
  float x;
  float y;
  int L;
  boolean up;
  boolean down;
  int point;
  
  Paddle (float x, float y) {
    this.x = x;
    this.y = y;
    this.L = 100;
    this.up = this.down = false;
    this.point = 0;
  }
}

Paddle p1 = new Paddle(10, 370);
Paddle p2 = new Paddle(980, 370);

boolean showMenu = true;
boolean winMenu = false;
SoundFile file;
PFont f;

void setup() {
    size(1000, 800);
    f = createFont("NovaMono", 80, true);
    file = new SoundFile(this, "bloop.wav");
}

void keyPressed() {
    if (key == 'w') {
        p1.up = true;
    }
    if (key == 's') {
        p1.down = true;
    }
    if (key == 32) {
        showMenu = false;
        winMenu = false;
        ball = new Ball();
        p1 = new Paddle(10, 370);
        p2 = new Paddle(980, 370);
    }
    if (key == 8) {
        showMenu = true;
        winMenu = false;
        p1.point = p2.point = 0;
    }

    if (key == CODED) {
        if (keyCode == UP) {
            p2.up = true;
        }
        if (keyCode == DOWN) {
            p2.down = true;
        }
    }

}

void keyReleased() {
    if (key == 'w') {
        p1.up = false;
    }
    if (key == 's') {
        p1.down = false;
    }
    if (key == CODED) {
        if (keyCode == UP) {
            p2.up = false;
        }
        if (keyCode == DOWN) {
            p2.down = false;
        }
    }
}

void draw() {
    background(20);
    fill(230);

    //line
    for (int dot = 0; dot < 40; dot++) {
        int dotx = 500;
        int doty = 20 * dot;
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
        file.play();
    }
    if (ball.x <= 0) {
        ball.x = 500;
        ball.y = 400;
        p2.point += 1;
        p1.L -= 20;
        file.play();
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
    if (p1.up == true) {
        p1.y -= 8;
    } else if (p1.down == true) {
        p1.y += 8;
    }
    if (p2.up == true) {
        p2.y -= 8;
    } else if (p2.down == true) {
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
          for (int dot = 0; dot < 40; dot++) {
          int dotx = 500;
          int doty = 20 * dot;
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