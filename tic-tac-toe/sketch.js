var field;
var WIDTH = 640, HEIGHT = 480;
// var COLOR = {
//     ORANGE : [255,200,0],
//     GREEN : [0,255,0],
//     GRAY : [128,128,128]
//     BLUEISHGRAY : [122,138,153]
//     LIGHTBLUE : [184,207,229]
// };
var patterns = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[2,0],[1,1],[0,2]],
];
var selectedX, selectedY;
var curPlayer;
var boxSize, margin, cellSize, fieldSize;
var xImg, oImg;

function preload() {
    xImg = loadImage('x.png');
    oImg = loadImage('o.png');
}

function restartGame() {
    field = [[0,0,0],
             [0,0,0],
             [0,0,0]];
    curPlayer = 1;
}

function setup() {
    selectedX = -1, selectedY = -1;
    boxSize = 50;
    margin = 2.5;
    cellSize = boxSize + 2*margin;
    fieldSize = 3 * cellSize;
    createCanvas(WIDTH,HEIGHT);
    noStroke();
    restartGame();
}

function drawTile(type, highlighted = false) {
    if (highlighted) {
        fill(184,207,229);
    } else {
        fill(122,138,153);
    }
    rect(0,0,cellSize,cellSize);
    push();
    translate(margin,margin);
    if (type == 1) {
        image(xImg,0,0,boxSize,boxSize);
    } else if (type == 2) {
        image(oImg,0,0,boxSize,boxSize);
    } else {
        fill(128);
        rect(0,0,boxSize,boxSize);
    }
    pop();
}

function draw() {
    fill(255);
    rect(0,0,fieldSize,fieldSize);
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++){
            push();
            translate(x*boxSize+2*x*margin,y*boxSize+2*y*margin);
            var selected = (x == selectedX && y == selectedY);
            drawTile(field[x][y], selected);
            pop();
        }
    }
}

function mouseMoved() {
    if (0 <= mouseX && mouseX < fieldSize &&
        0 <= mouseY && mouseY < fieldSize) {
        var x = floor(map(mouseX,0,fieldSize,0,3));
        var y = floor(map(mouseY,0,fieldSize,0,3));
        selectedX = x, selectedY = y;
    } else {
        selectedX = -1, selectedY = -1;
    }
}

function mousePressed() {
    if (0 <= mouseX && mouseX < fieldSize &&
        0 <= mouseY && mouseY < fieldSize) {
        var x = floor(map(mouseX,0,fieldSize,0,3));
        var y = floor(map(mouseY,0,fieldSize,0,3));
        if (field[x][y] == 0) {
            field[x][y] = curPlayer;
            curPlayer = 3 - curPlayer;
            var w = winner();
            if (w != 'none') {
                showWinner(w);
                restartGame();
            }
        }
    }
}

function showWinner(w) {
    if (w == 'first') {
        console.log('First player won!');
    } else if (w == 'second') {
        console.log('Second player won!');
    } else if (w == 'draw') {
        console.log('It\'s a draw!');
    }
}

function winner() {
    var stack = [];
    for (let pattern of patterns) {
        for (let pos of pattern) {
            stack.push(field[pos[0]][pos[1]]);
        }
        var a = stack.pop(), b = stack.pop(), c = stack.pop();
        if (a == b && b == c) {
            if (a == 1) {
                return 'first';
            } else if (a == 2) {
                return 'second';
            }
        }
    }
    // check for draw:
    var n = 0;
    for (let x = 0; x < 3; x++)
        for (let y = 0; y < 3; y++)
            if (field[x][y] != 0)
                n++;
    if (n == 9) {
        return 'draw';
    }
    return 'none';
}
