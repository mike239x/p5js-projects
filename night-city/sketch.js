const WIDTH = 600;
const HEIGHT = 400;

// Boundaries for buildings
const leftEdge = 0;
const rightEdge = 600;
const maxHeight = 250;
const minWidth = 50;
const minHeight = 50;
// Depth of the ground, in pixels
const ground = 50;

const LEFT = 0;
const RIGHT = 1;
const EMPTY = 0;

let debugging = false;

let drawing = false;
let startX, startY;

let buildings;
function createBuildings() {
  buildings = [];
  for (let i = 0; i < 10; i++) {
    let b = {};
    while(true) {
      b.left = round(random(leftEdge, rightEdge));
      b.right = round(random(leftEdge, rightEdge));
      b.top = round(random(minHeight,maxHeight));
      if (b.right - b.left >= minWidth) break;
    }
    buildings.push(b);
  }
}

let sides;
function createSides() {
  function cmp(sideA, sideB) {
    if (sideA.x < sideB.x) return -1;
    if (sideA.x > sideB.x) return 1;
    // If two buildings are next to each other, sharing one side,
    // we first add left side of right building, when right side of the left
    // building, so the gap between those will not be seen.
    if (sideA.side == LEFT && sideB.side == RIGHT) return 1;
    if (sideB.side == LEFT && sideA.side == RIGHT) return -1;
    // For left sides taller building goes first,
    if (sideA.side == LEFT) return sideB.obj.top - sideA.obj.top;
    // but for the right smaller buildings go first.
    if (sideA.side == RIGHT) return sideA.obj.top - sideB.obj.top;
  }
  sides = new Heap(cmp);
  for (let b of buildings) {
    sides.push({
      x : b.left,
      side : LEFT,
      obj : b
    });
    sides.push({
      x : b.right,
      side : RIGHT,
      obj : b
    });
  }
}

let roofs;
function createRoofs() {
  function cmp(houseA, houseB) {
    return houseB.top - houseA.top;
  }
  roofs = new Heap(cmp);
}

function handleSide(side) {
  // if we get a left side, add the building to roofs heap,
  if (side.side === LEFT) roofs.push(side.obj);
  // if it is the right side, remove the building from the roofs heap
  if (side.side === RIGHT) roofs.popItem(side.obj);
}

function topRoof() {
  let t = roofs[1];
  if (t == undefined) return 0;
  return t.top;
}

function drawBuildings() {
  if (debugging) {
    fill(255,255,255,50);
    stroke(255);
    strokeWeight(1);
    for (let b of buildings) rect(b.left,0,b.right-b.left,b.top);
  } else {
    // Some dumb work around for keeping random thins random
    // while having the windows only appear to be randomly on/off
    let seed = round(random(0,1000000));
    randomSeed(239);
    fill(0);
    noStroke();
    for (let b of buildings) {
      rect(b.left,0,b.right-b.left,b.top);
      // TODO: draw windows
    }
    randomSeed(seed);
  }
}

function drawBuildingsCountour() {
  noFill();
  if (debugging) {
    stroke(255,0,0); // red
    strokeWeight(3);
  } else {
    stroke(255); // white outline
    strokeWeight(1);
  }
  createSides();
  createRoofs();
  let n = sides.length;
  beginShape();
  vertex(leftEdge, 0);
  for (let i = 0; i < n; i++) {
    let side = sides.pop();
    vertex(side.x, topRoof());
    handleSide(side);
    vertex(side.x, topRoof());
  }
  vertex(rightEdge, 0);
  endShape();
}

function drawGround() {
  fill(0);
  noStroke();
  rect(0,0,WIDTH-1,-ground);
}

function drawScene() {
  push();
  // translate(0, HEIGHT-ground);
  applyMatrix(1,0,0,-1,0,HEIGHT-ground);
  background(0);
  if (!debugging) {
    // TODO: draw night sky, with stars and the moon
  }
  drawGround();
  drawBuildings();
  drawBuildingsCountour();
  pop();
}

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.mousePressed(() => {
    if (mouseY >= HEIGHT - ground) {
      drawing = true;
      startX = mouseX;
      startY = HEIGHT - ground;
    }
  });
  // canvas.mouseDragged();
  canvas.mouseReleased(() => {
    if (drawing && mouseY < HEIGHT - ground) {
      buildings.push({
        left : min(mouseX, startX),
        right : max(mouseX, startX),
        top : startY - mouseY
      });
      drawing = false;
    }
  });
  createBuildings();
  drawScene();

  createElement('br');
  let resetButton = createButton('reset');
  resetButton.mousePressed(createBuildings);
  let undoButton = createButton('undo');
  undoButton.mousePressed(() => {
    if (buildings != EMPTY) buildings.pop();
  });
  let eraseButton = createButton('erase all');
  eraseButton.mousePressed(() => {
    buildings = [];
  });

  let beautyCheckbox = createCheckbox('beauty mode', true);
  beautyCheckbox.changed(() => {
    debugging = !beautyCheckbox.checked();
  });

  createElement('br');
  createDiv('To create a new building start dragging a rectangle from underground.');
  createDiv('Undo button only deletes the last created building, so it can not undo "reset" or "erase all" buttons.');

}

function highlightPoint(px,py) {
  stroke(255);
  strokeWeight(1);
  beginShape(LINES);
  for (let x = 0, y = py; x <= WIDTH; x += 10) vertex(x,y);
  endShape();
  let x = px, y = 0;
  beginShape(LINES);
  for (let x = px, y = 0; y <= HEIGHT; y += 10) vertex(x,y);
  endShape();
}

function draw() {
  drawScene();
  if (drawing) {
    highlightPoint(startX, startY);
    highlightPoint(mouseX, min(HEIGHT-ground,mouseY));
  }
}

//-----------------------------------------------------------------------------

// This is a min-heap, so given the standard cmp function with cmp(a,b) = a-b
// and integers it will have element with minimal value on top.

// It also has some cheese in it, changing objects stored so they
// can be deleted by given stored obj. To do that I store the current index
// of the obj in the heap in its property heapIndex. Sidenote: this method
// doesn't allow multiple heaps with the same objects.
class Heap {
  constructor(cmp) {
    this.length = 0;
    this.cmp = cmp;
  }
  isEmpty() { return this.length === 0; }
  top () { return this[1]; }
  push(obj) {
    this.length++;
    let cur = this.length;
    this[cur] = obj;
    obj.heapIndex = cur;
    // sift up
    while (cur > 1) {
      let next = floor(cur/2);
      if (this.cmp(this[cur],this[next]) >= 0) return;
      this.swap(cur, next);
      cur = next;
    }
  }
  pop(i) {
    if (i == undefined) i = 1;
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.length--;
      let result = this[1];
      delete this[1];
      return result;
    }
    let result = this[i];
    this.swap(i,this.length);
    delete this[this.length];
    this.length--;
    // sift down
    let cur = i;
    while (1) {
      let left = 2*cur;
      let right = 2*cur+1;
      if (this[right] != undefined)
        if (this.cmp(this[right], this[left]) < 0 &&
            this.cmp(this[right], this[cur]) < 0) {
          this.swap(right, cur);
          cur = right;
          continue;
        }
      if (this[left] != undefined)
        if (this.cmp(this[left], this[cur]) < 0) {
          this.swap(left, cur);
          cur = left;
          continue;
        }
      return result;
    }
  }
  popItem(item) {
    this.pop(item.heapIndex);
  }
  swap(i,j) {
    const tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
    this[i].heapIndex = i;
    this[j].heapIndex = j;
  }
}
