const WIDTH = 600;
const HEIGHT = 400;

let leftEdge = 0;
let rightEdge = 600;
let maxHeight = 400;
const LEFT = 0;
const RIGHT = 1;

let buildings;
function createBuildings() {
  buildings = [];
  for (let i = 0; i < 10; i++) {
    let b = {};
    // TODO: mb round those up?
    b.left = random(leftEdge, rightEdge);
    b.right = random(leftEdge, rightEdge);
    if (b.left > b.right) {
        let tmp = b.left;
        b.left = b.right;
        b.right = tmp;
    }
    b.top = random(0,maxHeight);
    buildings.push(b);
  }
}

let sides;
function createSides() {
  function cmp(sideA, sideB) {
    if (sideA.x < sideB.x) return -1;
    if (sideA.x > sideB.x) return 1;
    // If two buildings are next to eachother, sharing one side,
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
  fill(0,0,0,50);
  stroke(0);
  strokeWeight(1);
  for (let b of buildings) rect(b.left,0,b.right-b.left,b.top);
}

function drawBuildingsCountour() {
  // console.log('a');
  noFill();
  stroke(255,0,0); // red
  strokeWeight(3);
  // console.log('b');
  createSides();
  // console.log('c');
  createRoofs();
  // console.log('d');
  let n = sides.length;
  // console.log('e', n);
  beginShape();
  vertex(leftEdge, 0);
  for (let i = 0; i < n; i++) {
    let side = sides.pop();
    vertex(side.x, topRoof());
    console.log(side);
    handleSide(side);
    vertex(side.x, topRoof());
  }
  vertex(rightEdge, 0);
  endShape();
  // console.log('f');
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  // console.log('1');
  createBuildings();
  // console.log('2');
  background(255);
  drawBuildings();
  // console.log('3');
  drawBuildingsCountour();
  // console.log('4');
}


function draw() {

}

function mouseClicked() {
  setup();
}

// TODO: add dragAndDrop to create new buildings

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
