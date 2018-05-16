let xl = -1.5, xr = 1.5, dx = 0.25; // x left and right
let yb = -1, yt = 1, dy = 0.25; // y bot and top
let fs = 10, fps = 6; // field separation and particle size
let w = 600, h = 400;
let formula = 'f-x';

function setup() {
  // some HTML elements creation got offloaded into index.html file

  canvas = createCanvas(600,400);
  canvas.parent('canvas placeholder');

  let tabs = [];

  function addTab(spanID, label) {
    tabs.push(spanID);
    let b = createButton(label);
    b.mousePressed(()=>{
      for (let t of tabs) {
        select(t).hide();
      }
      select(spanID).show();
    });
    b.parent(select('#buttons'))
  }

  addTab('#formula', 'formula');
  addTab('#settings', 'settings');
  addTab('#extra settings', 'extra settings');
  addTab('#instructions', 'instructions');
  for (let t of tabs) select(t).hide();

}

function d(x,f) {
// derivative of the function f(x) in the point x with value f,
// calculated from the given formula
  return eval(formula);
}

function draw() {
  background(255);
  drawGrid();
  drawField();

}

function drawGrid() {
  stroke(200);
  strokeWeight(1);
  let a = ceil(xl/dx);
  let b = round(xr/dx);
  for (let i = a; i <= b; i++) {
    if (i === 0) strokeWeight(3);
    if (i === 1) strokeWeight(1);
    let x = map(i*dx,xl,xr,0,w-1);
    line(x,0,x,h-1);
  }
  a = ceil(yb/dy);
  b = round(yt/dy);
  for (let i = a; i <= b; i++) {
    if (i === 0) strokeWeight(3);
    if (i === 1) strokeWeight(1);
    let y = map(i*dy,yb,yt,h-1,0);
    line(0,y,w-1,y);
  }
}

function drawField() {
  push();
  translate(fs,fs);
  for (let i = 1; i < w/fs; i++) {
    push();
    for (let j = 1; j < h/fs; j++) {
      push();
      let x = map(i*fs,0,w-1,xl,xr);
      let y = map(j*fs,h-1,0,yb,yt);
      let phi = atan(d(x,y));
      stroke(110,110,110);
      if (phi > 0.2) stroke(110,255,110);
      if (phi < -0.2) stroke(255,110,110);
      rotate(-phi);
      line(-3,0,3,0);
      pop();
      translate(0,fs);
    }
    pop();
    translate(fs,0);
  }
  pop();

}
