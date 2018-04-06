let border;
let layers;
let dots;
let WIDTH, HEIGHT;
let chooseColor;

function setup () {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  size = min(WIDTH,HEIGHT)/2 - 100;
  createCanvas(WIDTH,HEIGHT);
  cookGeode();
}

function mouseClicked() {
  cookGeode();
}

function cookGeode(){
  translate(WIDTH/2, HEIGHT/2);
  chooseColorSheme();
  generateBorder();
  generateLayers();
  addSomeDots();
  for (let i = layers.length; i > 0; i--) {
    let l = layers[i-1];
    drawLayer(l.depth, l.width, l.color);
  }
  removeOutsides(color(255),color(0));
}

//depth, width, color
function drawLayer(d, w, col) {
  stroke(col);

  strokeWeight(2*(d+w));
  noFill();
  strokeJoin(ROUND);
  beginShape();
  for (let b of border) {
    vertex(b.x,b.y);
  }
  endShape(CLOSE);
  for (let p of dots) {
    if (p.depth < d) {
      strokeWeight(2*(d - p.depth));
      point(p.x,p.y);
    }
  }
}

function removeOutsides(bg, s) {
  fill(bg);
  stroke(s);
  strokeWeight(1);
  beginShape();
  vertex(-WIDTH/2,-HEIGHT/2);
  vertex(WIDTH/2,-HEIGHT/2);
  vertex(WIDTH/2,HEIGHT/2);
  vertex(-WIDTH/2,HEIGHT/2);
  beginContour();
  for (let i = border.length; i > 0; i--) {
    let b = border[i-1];
    vertex(b.x,b.y);
  }
  endContour();
  endShape(CLOSE);
}

function chooseColorSheme() {
  const mainColor = color(random(0,255),random(0,255),random(0,255));
  const black = color(0);
  const white = color(255);
  chooseColor = function () {
    if (random(0,1) < 0.5) {
      return lerpColor(mainColor,black,random(0,0.8));
    } else {
      return lerpColor(mainColor,white,random(0,0.8));
    }
  }
}

function generateBorder() {
  border = [];
  for (let i = 0; i < TWO_PI; i += PI / 100) {
    border.push({
      x : size*cos(i)+randomGaussian(0,1),
      y : size*sin(i)+randomGaussian(0,1)
    });
  }
}

function generateLayers() {
  layers = [];
  let d = 0;
  while (d < size) {
    let w = randomGaussian(4,1);
    layers.push({
      depth : d,
      width : w,
      color : chooseColor()
    });
    d+=w;
  }
}

function addSomeDots() {
  dots = [];
  for (let k = 0; k < 3; k++) {
    //find a center of a cluster
    let cx, cy;
    while(true) {
      cx = random(-size,size);
      cy = random(-size, size);
      if (dist(0,0,cx,cy) < size * 0.9) break;
    }
    //add some points around cluster
    let n = randomGaussian(10,2);
    for (let i = 0; i < n; i++) {
      let x = randomGaussian(cx,30);
      let y = randomGaussian(cy,30);
      let d = size-dist(0,0,x,y)-30;
      dots.push({
        x : x,
        y : y,
        depth : d
      });
    }
  }
}


function draw () {
}
