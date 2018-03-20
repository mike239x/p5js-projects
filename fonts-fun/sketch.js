var WIDTH = 640, HEIGHT = 480;
var COLOR = {
    YELLOW  : [255,255,  0],
    RED     : [255,  0,  0],
    DARKGRAY: [ 64, 64, 64],
    BLACK   : [  0,  0,  0],
    ORANGE  : [255,200,  0]
}
var myFont, normalFont, fontSize;

function preload() {
    myFont = loadFont('../fonts/handwritten/discover-earth/DiscoverEarth.ttf');
    normalFont = loadFont('../fonts/various/dreaming-castle/DreamingCastle.ttf');
}

function setup() {
    fontSize = 64;
    createCanvas(WIDTH,HEIGHT);

    background(COLOR.DARKGRAY);
    textAlign(LEFT);
    stroke(COLOR.ORANGE);
    fill(COLOR.ORANGE);
    // drawing string and corresponding dots

    push();
    translate(0,64);
    textFont(normalFont, fontSize);
    textLeading(35);
    var t = `QWERTYUIOPASDFGHJ\nKLZXCVBNM1234567890`;
    text(t, 0, 0);
    line(0,0,WIDTH,0);
    var po = normalFont.textToPoints(t);
    stroke(COLOR.RED);
    strokeWeight(3);
    for (let p of po)
        point(p.x,p.y);
    pop();
    //box of a symbol:
    push();
    translate(WIDTH/2,HEIGHT/2);
    textFont(normalFont, fontSize);
    var s = 'O';
    text(s,0,0);
    line(0,0,0,-64);
    var w = textWidth(s);
    line(w-1,0,w-1,-64);
    line(0,0,w-1,0);
    line(0,-64,w-1,-64);
    var b = normalFont.textBounds(s,0,0);
    noFill();
    rect(b.x,b.y,b.w,b.h);
    pop();

    push();
    applyMatrix(2,0,0,1,0,HEIGHT*0.75);
    textFont(myFont, fontSize);
    s = `All your BASE \nbelong to us.`;
    text(s,0,0);
    pop();
    push();
    applyMatrix(2.5,0,0,1,0,HEIGHT*0.5);
    textFont(myFont, fontSize);
    s = `test pls`;
    drawWord(s,3,myFont);
    pop();

}

function drawWord(w, margin, f) {
    // var x = 0;
    //TODO rewrite this function so that
    // it returns X position at the end of the word drawn
    push();
    for (let e of w) {
        var b = f.textBounds(e,0,0);
        translate(margin-b.x,0);
        text(e,0,0);
        translate(b.w+b.x,0);
    }
    pop();
}

function draw() {
}

function keyPressed() {
}
