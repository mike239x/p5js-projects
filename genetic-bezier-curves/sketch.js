// let curves; - defined in add-curves
let evo;

let gen = 0;
//TODO refactor using normal names

function preload() {
  // curves = loadJSON('curves.json');
  //this one is loaded in index.html
}

//TODO delete this part
function mouseClicked() {
  noLoop();
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  evo = [];
  for (let c of curves) {
    let e = EvolutionFactory(c);
    e.populate(10);
    evo.push(e);
  }
}

function draw() {
  background(0);
  strokeWeight(1);
  stroke(100);
  noFill();

  for (let c of curves) {
    drawMyCurve(c);
  }

  stroke (255);
  for (let c of evo[0].population) {
    c.draw();
  }

  stroke(255,0,0);

  for (let e of evo) {
    e.best().draw();
  }

  stroke (255,200,10);
  evo[0].best().draw();

  fill(255);
  noStroke();

  text(`gen: ${gen}`, 0,20);
  text(`FPS: ${format(frameRate(),0)}`,0,40);
  let y = 60;
  for (let e of evo) {
    text(`${format(e.best().value(),2)}`, 0, y);
    y += 20;
  }
  gen++;

  for (let e of evo) {
    e.makeStep();
  }
}

function format(n,d) {
  let p = 10**d;
  return (floor(n*p)/p);
}

function drawMyCurve(c) {
  noFill();
  beginShape();
  for (let p of c) {
    vertex(p.x,p.y);
  }
  endShape();
}

//TODO: rename this
function lerpfold(points, coef) {
  if (points.length == 1) return points[0];
  let re = [];
  let a = undefined;
  let b = undefined;
  for (let p of points) {
    b = p;
    if (a != undefined) {
      re.push(p5.Vector.lerp(a,b,coef));
    }
    a = b;
  }
  return lerpfold(re, coef);
}
