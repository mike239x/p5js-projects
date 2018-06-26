let geo;
let font;
let WIDTH;
let HEIGHT;
let seed = 0;
let supporting = true;
let code =
  "// press Ctrl+Enter to recompile the code\n"+
  "// hold Ctrl to see supporting info\n"+
  "// click on the canvas to increment the random seed\n"+
  "let A = new Dot(400,80, 'A').labelPos('T').size(20).color(255,0,0);\n"+
  "let B = new Dot(180,250, 'B').labelPos('L');\n"+
  "let C = new Dot(500,350, 'C');\n"+
  "let X = new Dot(350,230, 'X').labelPos('T');\n"+
  "let Y = new Dot(200,140, 'Y').labelPos('L');\n"+
  "strokeWeight(1); stroke(100,255,100,150);\n"+
  "geo.fillPoly(12, -45, A,B,C);\n"+
  "strokeWeight(1); stroke(255,0,0,100);\n"+
  "geo.lines(X.connect(Y));\n"+
  "strokeWeight(2); stroke(0);\n"+
  "geo.chain(A,B,C,A,_,X,Y);\n"+
  "geo.dots(A,B,C,X,Y);";
let canvas;
let ide;

function preload() {
  font = loadFont("fonts/cmunss.otf");
}

function setup() {
  WIDTH = windowWidth*0.6;
  HEIGHT = windowHeight-5;
  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.mouseClicked(()=>++seed);
  ide = createElement('textarea',code);
  ide.attribute('placeholder','write your code here');
  ide.attribute('autocomplete','off');
  ide.attribute('autocorrect','off');
  ide.attribute('autocapitalize','off');
  ide.attribute('spellcheck','false');
  ide.style('resize','none');
  resize();
  textFont(font);
  textSize(16);
  geo = new GeoScribble();
}

function resize() {
  WIDTH = windowWidth*0.6;
  HEIGHT = windowHeight-5;
  canvas.size(WIDTH, HEIGHT);
  ide.size(windowWidth - WIDTH-20, HEIGHT-10);
  ide.position(WIDTH,0);
}

function windowResized() {
  resize();
}

function draw() {
  let _ = undefined;
  randomSeed(seed);
  background(255);
  if (keyIsDown(CONTROL)) {
    geo.text(`${mouseX} ${mouseY}\nseed: ${seed}`,2,2, 0, [0,0]);
    stroke(100);
    line(0,0,WIDTH-1,0);
    line(0,0,0,HEIGHT-1);
    line(WIDTH-1,HEIGHT-1,WIDTH-1,0);
    line(WIDTH-1,HEIGHT-1,0,HEIGHT-1);
    line(mouseX,0,mouseX,HEIGHT-1);
    line(0,mouseY,WIDTH-1,mouseY);
  }
  if (keyIsDown(CONTROL) && keyIsDown(ENTER)) {
    code = ide.value();
  }
  try {
    eval(code);
  } catch (e) {
    stroke(0); fill(0);
    // geo.text(e.message,WIDTH-2,HEIGHT-2, 0, [1,1]);
    geo.text(e,WIDTH-6,HEIGHT-6, 0, [1,1]);
  } finally {
  }
}
