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
    myFont = loadFont('../../fonts/handwritten/discover-earth/DiscoverEarth.ttf');
    normalFont = loadFont('../../fonts/various/dreaming-castle/DreamingCastle.ttf');
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


//TODO: check if this works:
//TODO: doesn't work from the box, since by default
// textFont() returns "sans-serif" and not a p5.Font object
// mb I should pass a font object with arguements
function write_text (t, x, y,  align = 'M', corner = 'none') => {
  // corners: TL, TR, BL, BR - made out of top, bottom, left and right
  // no corner for standerd behavior
  // align: (L)eft, (M)id, or (R)ight
  //TODO: this line right here causing some troubles:
  let font = textFont();
  let lines = t.split("\n");
  let boxes = [];
  let l = 0;
  for (let line of lines) {
    let b = font.textBounds(line,0,0);
    if (b.w > l) l = b.w;
    boxes.push(b);
  }
  let n = boxes.length;
  let container = {
    x : 0,
    y : boxes[0].y,
    w : l,
    h : (n-1)*textLeading() - boxes[0].y + boxes[n-1].y+boxes[n-1].h
    // or mb + max(0,boxes[n-1].y+boxes[n-1].h)
  };
  for (let b of boxes) {
    switch (align) {
      case 'M': b.x = (l - b.w) / 2; break;
      case 'R': b.x = l - b.w; break;
      case 'L': default: break;
    }
  }
  let top = container.y;
  let bot = container.y + container.h;
  let left = container.x;
  let right = container.x + container.w;
  let d = switch(corner) {
    case 'BR': [right,bot]; break;
    case 'BL': [left,bot]; break;
    case 'TR': [right,top]; break;
    case 'TL': [left,top]; break;
    default: [0,0]; break;
  };
  for (let i = 0; i < n; i++) {
    text( lines[i],
      x + boxes[i].x - d[0],
      y - d[1] + i*textLeading() );
  }
};
