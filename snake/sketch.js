var boxSize = 40;
var appleSize = 12;
var stoneSize = 30;
var fieldWidth = 30, fieldHeight = 15;
var WIDTH = boxSize * fieldWidth, HEIGHT = boxSize * fieldHeight;
var COLOR = {
    RED     : [255,  0,  0],
    BLUE    : [  0,  0,255],
    GREEN   : [  0,255,  0],
    YELLOW  : [255,255,  0],
    ORANGE  : [255,200,  0],
    VIOLET  : [200,  0,255],
    BLACK   : [  0,  0,  0],
    DARKGRAY: [ 64, 64, 64]
}
var directions = {
    w : [ 0,-1],
    a : [-1, 0],
    s : [ 0, 1],
    d : [ 1, 0]
}
var myFont;
var keysPressed = {
    w : false,
    a : false,
    s : false,
    d : false
};
// game variables:
var gameState;
var field = [];
for (let x = 0; x < fieldWidth; x++) {
    field.push([]);
    for (let y = 0; y < fieldHeight; y++)
        field[x].push(0);
};
var appleDropRate = 0.1;
var stoneDropRate = 0.01;
var head = {
    x : 0,
    y : 0
}
var direction;
var len;


function preload() {
    myFont = loadFont('../fonts/monospaced/SVBasicManual/SVBasicManual.ttf');
}

function restartGame() {
    for (let x = 0; x < fieldWidth; x++)
        for (let y = 0; y < fieldHeight; y++)
            field[x][y] = 0;
    direction = [1,0];
    len = 2;
    head.x = floor(random(fieldWidth*2/3))+1;
    head.y = floor(random(fieldHeight));
    field[head.x][head.y] = 2;
    field[head.x-1][head.y] = 1;
}

function setup() {
    createCanvas(WIDTH,HEIGHT);
    frameRate(10);
    gameState = -1; // starting screen
    background(250,0,0);
    textFont(myFont, boxSize);
    prepareWelcomeScreen();
}

function prepareWelcomeScreen() {
    field[0][0] = 1;
    field[0][1] = 2;
    field[0][2] = 3;
    len = 3;
    field[0][4] = -1;
    field[0][6] = -2;
}

function drawTile(type) {
    push();
    translate(boxSize/2,boxSize/2);
    rectMode(CENTER);
    //draw background
    strokeWeight(1);
    stroke(68); //a bit lighter shade of darkgray
    fill(COLOR.DARKGRAY);
    rect(0,0,boxSize,boxSize);
    if (type > 0) { // draw part of the snake
        var a = map(type, 0, len, 0, 256);
        var snakeColor = COLOR.ORANGE.slice();
        snakeColor[3] = a;
        stroke(snakeColor);
        strokeWeight(4);
        noFill();
        rect(0,0,boxSize*0.75,boxSize*0.75);
    } else if (type == -1) { // draw a cyberapple
        stroke(COLOR.GREEN);
        strokeWeight(3);
        noFill();
        rotate(PI/4);
        rect(0,0,appleSize,appleSize);
    } else if (type == -2) { //draw some fire
        stroke(COLOR.RED);
        strokeWeight(3);
        noFill();
        beginShape();
        for (let i = 0; i < 4; i++) {
            vertex(random(-boxSize/4,boxSize/4), random(-boxSize/4,boxSize/4));
        };
        endShape(CLOSE);
    }
    pop();
}

function drawField() {
    for (let x = 0; x < fieldWidth; x++) {
        for (let y = 0; y < fieldHeight; y++) {
            push();
            translate(x*boxSize,y*boxSize);
            drawTile(field[x][y]);
            pop();
        }
    }
}

function draw() {
    var lines;
    const r = boxSize;
    switch (gameState) {
        case -1: // game just started
            drawField();
            lines = [
                'Welcome to NEON-SNAKE',
                'Use WASD to control the snake',
                'Eat any many cyber-apples as you can',
                'Avoid corrupted cyber-apples',
                'Press ENTER to start'
            ];
            stroke(COLOR.ORANGE);
            fill(COLOR.ORANGE);
            text(lines[0],2*r,r);
            text(lines[1],2*r,3*r);
            text(lines[2],2*r,5*r);
            text(lines[3],2*r,7*r);
            text(lines[4],2*r,9*r);
            break;
        case 1:
            const myColor = COLOR.DARKGRAY.slice();
            myColor[3] = 10;
            fill(myColor);
            noStroke();
            rect(0,0,WIDTH,HEIGHT);
            lines = [
                `You ate ${(len-2)} cyber-apples`,
                'Well done',
                'Press ENTER to restart'
            ];
            stroke(COLOR.ORANGE);
            fill(COLOR.ORANGE);
            text(lines[0],2*r,r);
            text(lines[1],2*r,3*r);
            text(lines[2],2*r,5*r);
            break;
        default: // playing
            handlePressedKeys();
            moveSnake();
            releaseKeys();
            generateDrops();
            drawField();
    }
}
function generateDrops() {
    if (random(1) < appleDropRate) {
            var x = floor(random(fieldWidth));
            var y = floor(random(fieldHeight));
            if (field[x][y] == 0) {
                field[x][y] = -1;
            }
    }
    if (random(1) < stoneDropRate) {
            var x = floor(random(fieldWidth));
            var y = floor(random(fieldHeight));
            if (field[x][y] == 0) {
                field[x][y] = -2;
            }
    }
}

function moveSnake() {
    direction = chooseDirection();
    head.y += direction[1];
    head.x += direction[0];
    if (0 > head.x || head.x >= fieldWidth ||
        0 > head.y || head.y >= fieldHeight) {
        gameState = 1;
    } else if (field[head.x][head.y] > 1) {
        gameState = 1;
    } else if (field[head.x][head.y] == -2) {
        gameState = 1;
    } else {
        if (field[head.x][head.y] == -1) {
            len++;
        } else {
            for (let x = 0; x < fieldWidth; x++) {
                for (let y = 0; y < fieldHeight; y++) {
                    if (field[x][y] > 0) {
                        field[x][y]--;
                    }
                }
            }
        }
        field[head.x][head.y] = len;
    }
}

function chooseDirection() {
    var d = direction;
    var nd = [0,0];
    var tmp;
    for (c in keysPressed) {
        if (keysPressed[c]) {
            tmp = directions[c];
            if (tmp[0]*d[0] + tmp[1]*d[1] == 0) {
                nd[0] += tmp[0];
                nd[1] += tmp[1];
            }
        }
    }
    if (nd[0] == 0 && nd[1] == 0) {
        nd = d;
    }
    return nd;
}

function handlePressedKeys() {
    if (keyIsDown(87)) {
        keysPressed['w'] = true;
    }
    if (keyIsDown(65)) {
        keysPressed['a'] = true;
    }
    if (keyIsDown(83)) {
        keysPressed['s'] = true;
    }
    if (keyIsDown(68)) {
        keysPressed['d'] = true;
    }
}

function releaseKeys() {
    for (c in keysPressed) {
        keysPressed[c] = false;
    }
}

function keyTyped() {
    switch (gameState) {
        case -1:
        case 1:
            if (keyCode == ENTER) {
                gameState = 0;
                restartGame();
            }
            break;
        default: //case 0:
            if (keysPressed.hasOwnProperty(key)) {
                keysPressed[key] = true;
            }
    }
}
