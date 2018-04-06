let border;
let layers;
let dots;
let WIDTH, HEIGHT;

function setup () {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  size = min(WIDTH,HEIGHT)/2 - 100;
  createCanvas(WIDTH,HEIGHT);
  translate(WIDTH/2, HEIGHT/2);
  stroke(0);

  generateBorder();
  generateLayers();
  addSomeDots();

  for (let i = layers.length; i > 0; i--) {
    let l = layers[i-1];
    drawLayer(l.depth, l.width, l.color);
  }

  removeOutsides(color(255),color(0));

  // highlight border points:
  // stroke(0);
  // strokeWeight(3);
  // for (let b of border) {
  //   point(b.x,b.y);
  // }

}

//depth, width, color
function drawLayer(d, w, col) {
  stroke(col);

  strokeWeight(d+w);
  for (let b of border) {
    point(b.x,b.y);
  }
  // noFill();
  // beginShape();
  // for (let b of border) {
  //   vertex(b.x,b.y);
  // }
  // endShape(CLOSE);
  for (let p of dots) {
    if (p.depth < d) {
      strokeWeight(d - p.depth);
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
  // in theory d < size should be enough,
  //but for some wierd reasons it doesn't work
  while (d < 2*size) {
    let w = randomGaussian(6,1);
    layers.push({
      depth : d,
      width : w,
      //random goes only to 200 so that no mega-toxic colors appear
      color : color(random(0,200),random(0,200),random(0,200))
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
      let d = size-dist(0,0,x,y);
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
