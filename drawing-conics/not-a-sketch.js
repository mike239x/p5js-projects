
// big chunk of the code is taken from Daniel Shiffman
// from this video: https://youtu.be/tIXDik5SGsI

let x_vals = [];
let y_vals = [];

let a, b, c, d, e;
let dragging = false;

const learningRate = 0.2;
const optimizer = tf.train.adam(learningRate);

const WIDTH;
const HEIGHT;

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(WIDTH,HEIGHT);
  a = tf.variable(tf.scalar(random(-1, 1)));
  b = tf.variable(tf.scalar(random(-1, 1)));
  c = tf.variable(tf.scalar(random(-1, 1)));
  d = tf.variable(tf.scalar(random(-1, 1)));
  e = tf.variable(tf.scalar(random(-1, 1)));
}

function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

function predict(x) {
  const xs = tf.tensor1d(x);
  // y = ax^3 + bx^2 + cx + d
  const ys = xs.pow(tf.scalar(3)).mul(a)
    .add(xs.square().mul(b))
    .add(xs.mul(c))
    .add(d);
  return ys;
}


function mousePressed() {
  dragging = true;
}

function mouseReleased() {
  dragging = false;
}

function draw() {
  if (dragging) {
    let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    x_vals.push(x);
    y_vals.push(y);
  } else {
    tf.tidy(() => {
      if (x_vals.length > 0) {
        const ys = tf.tensor1d(y_vals);
        optimizer.minimize(() => loss(predict(x_vals), ys));
      }
    });
  }

  background(0);

  stroke(255);
  strokeWeight(8);
  for (let i = 0; i < x_vals.length; i++) {
    let px = map(x_vals[i], -1, 1, 0, width);
    let py = map(y_vals[i], -1, 1, height, 0);
    point(px, py);
  }


  //drawing something of a conic
  let step = 50;
  for (let i = 0; i < WIDTH; i+=step) {
    for (let j = 0; i < HEIGHT; j+=step) {
      let x = map(i, 0,WIDTH, 0,1);
      let y = map(j, HEIGHT,0, 0,1);
      let Q = 0
    }
  }

}
