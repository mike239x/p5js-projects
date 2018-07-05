// let curves; - defined in add-curves
let evo;

let gen = 0;
let paused = false;
//TODO refactor using normal names

function preload() {
  // curves = loadJSON('curves.json');
  //this one is loaded in index.html
}


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  evo = [];
  for (let c of curves) {
    let e = EvolutionFactory(c);
    e.populate(10);
    evo.push(e);
  }
  // noLoop();
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    // evo[0].makeStep(true);
    redraw();
  }
  if (key == 'p' || key == 'P') {
    // evo[0].makeStep(true);
    if (paused) {
      paused = false;
      loop();
    } else {
      paused = true;
      noLoop();
    }
  }
}

function draw() {
  background(0);
  strokeWeight(1);
  stroke(10);
  noFill();

  for (let c of curves) {
    drawMyCurve(c);
  }

  stroke (255);
  for (let c of evo[0].population) {
    c.draw();
  }

  // stroke(255,0,0);
  //
  // for (let e of evo) {
  //   e.best().draw();
  // }

  stroke (255,200,10);
  evo[0].best().draw();

  fill(255);
  noStroke();

  text(`gen: ${gen}`, 0,20);
  text(`FPS: ${format(frameRate(),0)}`,0,40);
  // let y = 60;
  // for (let e of evo) {
  //   text(`${format(e.best().value(),2)}`, 0, y);
  //   y += 20;
  // }
  gen++;

  let y = 60;
  for (let c of evo[0].population) {
    text(`${format(c.value(),3)}`, 0, y);
    y += 20;
  }



  evo[0].makeStep();
  // for (let e of evo) {
  //   e.makeStep();
  // }
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
