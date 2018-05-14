var state = {
    Menu: 0,
    Level: 1,
    MenuLevel: 2,
    YouWin: 3,
}
var data, level, currentLevel, currentState;

function Level(x, y, interval) {
    this.row = Math.floor(Math.random() * interval)+1;
    this.col = Math.floor(Math.random() * interval)+1;
    this.x = x;
    this.y = y;
    this.interval = interval;
}

function preload() {
    data = loadJSON("data.json");
    gameFont = loadFont('./assets/Raleway-Bold.ttf');
}

function setup() {
    levels = [];
    currentLevel = 0;
    for (var i=0; i<data.levels.length; i++) {
        var g = data.levels[i];
        levels.push(new Level(g.x, g.y, g.interval));
    }
    level = levels[currentLevel];
    currentState = state.Menu;
    createCanvas(800, 800);
}

function drawMenu(){
    background(data.menuBackground);
    fill(data.menuFill);
    textAlign(CENTER);
    textSize(36);
    textFont(gameFont);
    text(data.menuText, data.menuTextX, data.menuTextY);
}

function menuLevelUp(){
    fill(data.menuFill);
    text(data.menuLevelUpText, data.menuLevelUpTextX, data.menuLevelUpTextY);
}

function drawYouWin(){
    background(data.menuBackground);
    fill(data.menuFill);
    text(data.menuYouWinText, data.menuTextX, data.menuTextY);
}

function drawPicker() {
    var r = 255 - (level.x * (255/level.interval)),
        g = 255 - (level.x+level.y) * (255/level.interval),
        b = 255 - level.y * (255/level.interval);
    fill(r,g,b);
    noStroke();
    ellipse(400,400,500,500);
}

function drawCurrentLevel() {
    fill("#FFFFFF");
    text("Level " + currentLevel, 400, 100);
}

function update() {
    switch (currentState) {
        case state.Level:
            if (level.x == level.row && level.y == level.col) {
                currentState = state.MenuLevel;
            }
            break;
    }
}

function draw() {
    switch (currentState) {
        case state.Menu:
            drawMenu();
            break;
        case state.Level:
            var r = 255-(level.row)*(255/level.interval),
                g = 255-(level.row+level.col)*(255/level.interval),
                b = 255-level.col*(255/level.interval);
            background(r,g,b);
            drawPicker();
            drawCurrentLevel();
            break;
        case state.MenuLevel:
            menuLevelUp();
            break;
        case state.YouWin:
            drawYouWin();
            break;
        default:
            break;
    }

    update();
}

function keyReleased() {
    var left_key, right_key, down_key, up_key;
    if (currentState == state.Level && currentLevel == 1) {
        left_key = LEFT_ARROW;
        right_key = RIGHT_ARROW;
        down_key = DOWN_ARROW;
        up_key = UP_ARROW;
    } else {
        left_key = 65; //a
        right_key = 68; //d
        down_key = 83; //s
        up_key = 87; //w
    }

    switch (keyCode) {
        case left_key:
            level.x -= 1;
            break;
        case right_key:
            level.x += 1;
            break;
        case up_key:
            level.y -= 1;
            break;
        case down_key:
            level.y += 1;
            break;
        case 32:
            switch (currentState) {
                case state.Menu:
                case state.MenuLevel:
                    if (currentLevel < levels.length) {
                        level = levels[currentLevel];
                        currentState = state.Level;
                        currentLevel += 1;
                    } else {
                        currentState = state.YouWin;
                    }
                    break;
                case state.Level:
                default:
                    break;
            }
    }
    level.x = max(0, min(level.x, level.interval));
    level.y = max(0, min(level.y, level.interval));
}
