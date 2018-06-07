const WIDTH = 600;
const HEIGHT = 400;

let cities = [];
let step = 1;
let path = [];

function reset() {
  step = 1;
  cities.length = 0;
  path.length = 0;
  for (let i = 0; i < 100; i++) {
    cities.push({
      x : floor(random(0, WIDTH)),
      y : floor(random(0, HEIGHT))
    });
    path.push(i);
  }
}

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  reset();
  canvas.mouseClicked(
    () => {
      step = 1;
      path.push(cities.length);
      cities.push({
        x : mouseX,
        y : mouseY
      });
  });

  createElement('br');
  let resetButton = createButton('reset');
  resetButton.mousePressed(reset);
  let undoButton = createButton('undo');
  undoButton.mousePressed(() => {
    if (cities.length) {
      step = 1;
      cities.pop();
      path.splice(path.indexOf(cities.length), 1);
    }
  });
  let eraseButton = createButton('erase all');
  eraseButton.mousePressed(() => {
    step = 1;
    cities.length = 0;
    path.length = 0;
  });
}

function d(a,b) {
  return dist(a.x,a.y,b.x,b.y);
}

function modifyPath() {
  if (path.length > 3) {
    // console.log('modifying the path');
    let i = 0, j = 0;
    while (i >= j) {
      i = floor(random(1,path.length-1));
      j = floor(random(2,path.length));
      // console.log(i,j);
    }
    // console.log('found a good pair');
    let A = cities[path[i-1]];
    let I = cities[path[i]];
    let J = cities[path[j]];
    let B = (j === path.length - 1) ? cities[path[0]] : cities[path[j+1]];
    let delta = d(A,I) + d(J,B) - d(A,J) - d(I,B);
    if (random(0,1) < exp(delta*step)) {
      tmp = path.splice(i,j-i+1);
      reverse(tmp);
      tail = path.splice(i);
      path = path.concat(tmp).concat(tail);
      step++;
    }
  }
}

function draw() {
  modifyPath();

  background(255);
  noFill();
  stroke(200);
  strokeWeight(2);
  strokeJoin(ROUND);
  beginShape();
  for (let i of path) vertex(cities[i].x,cities[i].y);
  endShape(CLOSE);

  stroke(0);
  strokeWeight(5);
  for (let c of cities) point(c.x,c.y);
  stroke(255,0,0);
  strokeWeight(8);
  if (cities.length) point(cities[0].x, cities[0].y);
}
