let curves;
let cur;


function setup() {
  createCanvas(windowWidth,windowHeight);
  curves = [];
}

function mousePressed() {
  cur = [new p5.Vector(mouseX,mouseY)];
}

function mouseDragged() {
  cur.push(new p5.Vector(mouseX,mouseY));
}

function mouseReleased() {
  curves.push(cur);
  cur = undefined;
}

function keyTyped() {
  if (key == 's' || key == 'S') {
    saveJSON(curves,'curves.json');
  } else {
    curves.pop();
  }
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  for (let c of curves) {
    beginShape();
    for (let p of c) {
      vertex(p.x,p.y);
    }
    endShape();
  }
  beginShape();
  if (cur != undefined) {
    for (let p of cur) {
      vertex(p.x,p.y);
    }
    endShape();
  }
}
