var WIDTH = 640, HEIGHT = 480;
var boxSize;
var COLOR = {
    YELLOW  : [255,255,  0],
    RED     : [255,  0,  0],
    DARKGRAY: [ 64, 64, 64],
    BLACK   : [  0,  0,  0],
    ORANGE  : [255,200,  0]
}
var len;
var field;
var fieldWigth, fieldHeight;
var direction;
var lastKey;
var dropRate;
var appleSize;
var gameState;
var head = {
    x : 0,
    y : 0
}
var myFont;

function preload() {
    myFont = loadFont('../fonts/handwritten/love-and-trust/LoveAndTrust.ttf');
}

function restartGame() {
    for (let x = 0; x < fieldWigth; x++)
        for (let y = 0; y < fieldHeight; y++)
            field[x][y] = 0;
    direction = [1,0];
    lastKey = 'o';
    len = 1;
    head.x = floor(random(fieldWigth*2/3));
    head.y = floor(random(fieldHeight));
    field[head.x][head.y] = 1;
}

function setup() {
    createCanvas(WIDTH,HEIGHT);
    frameRate(30);
    boxSize = 7;
    fieldWigth = 50, fieldHeight = 50;
    field = [];
    for (let x = 0; x < fieldWigth; x++) {
        field.push([]);
        for (let y = 0; y < fieldHeight; y++)
            field[x].push(0);
    }
    appleSize = 5;
    dropRate = 1;
    gameState = -1; // starting screen
    background(250,0,0);
    textFont(myFont, 32);
}

function drawTile(type) {
    noStroke();
    fill(COLOR.DARKGRAY);
    rect(0,0,boxSize,boxSize);
    if (type > 0) {
        var a = map(type, 0, len, 0, 256);
        // strokeWeight(1);
        stroke(COLOR.YELLOW.concat([a]));
        fill(COLOR.BLACK.concat([a]));
        ellipse(boxSize/2,boxSize/2,boxSize);
    } else if (type < 0) {
        stroke(COLOR.RED);
        ellipse(boxSize/2,boxSize/2,appleSize);
    }
}

function draw() {
    switch (gameState) {
        case -1: // game just started
            background(COLOR.DARKGRAY);
            push();
            translate(WIDTH/2, HEIGHT/2);
            stroke(COLOR.ORANGE);
            fill(COLOR.ORANGE);
            textAlign(CENTER);
            // textLeading(0);
            text('This is welcome screen.\n\
                Use WASD to move around.\n\
                Press ENTER to start.',0,-16);
            pop();
            break;
        case 1: // end of the game screen
            background(COLOR.DARKGRAY);
            push();
            translate(WIDTH/2, HEIGHT/2);
            stroke(COLOR.ORANGE);
            fill(COLOR.ORANGE);
            textAlign(CENTER);
            text(`You ate ${(len-1)} cyber-apples. Well done!\n\
                Press ENTER to restart.`,0,-16);
            pop();
            break;
        default: // playing
            var newDir;
            switch (lastKey) {
                case 'A':
                    newDir = [-1,0];
                    break;
                case 'D':
                    newDir = [1,0];
                    break;
                case 'W':
                    newDir = [0,-1];
                    break;
                case 'S':
                    newDir = [0,1];
                    break;
                default:
                    newDir = direction;
            }
            if (newDir[0]+direction[0] == 0 && newDir[1]+direction[1] == 0) {
                newDir = direction;
            }
            direction = newDir;
            head.y += direction[1];
            head.x += direction[0];
            if (0 > head.x || head.x >= fieldWigth ||
                0 > head.y || head.y >= fieldHeight) {
                gameState = 1;
            } else if (field[head.x][head.y] > 1) {
                gameState = 1;
            } else {
                if (field[head.x][head.y] == -1) {
                    len++;
                } else {
                    for (let x = 0; x < fieldWigth; x++) {
                        for (let y = 0; y < fieldHeight; y++) {
                            if (field[x][y] > 0) {
                                field[x][y]--;
                            }
                        }
                    }
                }
                field[head.x][head.y] = len;
                if (random(1) < dropRate) {
                        var x = floor(random(fieldWigth));
                        var y = floor(random(fieldHeight));
                        if (field[x][y] == 0) {
                            field[x][y] = -1;
                        }
                }
            }
            for (let x = 0; x < fieldWigth; x++) {
                for (let y = 0; y < fieldHeight; y++) {
                    push();
                    translate(x*boxSize,y*boxSize);
                    drawTile(field[x][y]);
                    pop();
                }
            }

    }
}

function keyPressed() {
    switch (gameState) {
        case -1:
        case 1:
            if (keyCode == ENTER) {
                gameState = 0;
                restartGame();
            }
            break;
        default:
            lastKey = key;
    }
}
