// curves
let lines;

const learningRate = 1.2;
const optimizer = tf.train.adam(learningRate);
// const optimizer = tf.train.momentum(learningRate,0.3);

let paused = false;
let debug = false;

function keyTyped() {
  if (key == 'p' || key == 'P') {
    paused = !paused;
    if (paused) {
      noLoop();
    } else {
      loop();
    }
  }
  if (key == 'i' || key == 'I') {
    debug = !debug;
  }
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  lines = [];
  for (let c of curves) {
    const cpn = 4;
    const delta = 0.02;
    class Line {
      constructor() {
        // curve points
        let curve_points = [];
        for (let p of c) {
          curve_points.push([p.x,p.y]);
        }
        this.curve_points = tf.tensor2d(curve_points);
        // coefficients for the loss function
        let tmp = [];
        for (let i = 0; i < c.length; i++) {
          let t = i/(c.length-1);
          let j = 1-t;
          tmp.push([t*t*t,3*t*t*j,3*t*j*j,j*j*j]);
        }
        this.coefficients = tf.tensor2d(tmp);
        // control points
        tmp = [];
        for (let i = 0; i < cpn; i++) {
          // tmp.push([random(0,windowWidth),random(0,windowHeight)]);
          tmp.push([randomGaussian(300,100),randomGaussian(250,100)]);
        }
        this.control_points = tf.variable(tf.tensor2d(tmp));
        // color
        this.color = [floor(random(70,256)),floor(random(70,256)),floor(random(70,256))]
      }
      dataSync() {
        let tmp = this.control_points.dataSync();
        for (let x of tmp) {
          if (isNaN(x)) {
            return;
          }
        }
        this.cp = tmp;
      }
      draw() {
        noFill();
        stroke(50);
        strokeWeight(1);
        line(this.cp[0],this.cp[1],this.cp[2],this.cp[3]);
        line(this.cp[4],this.cp[5],this.cp[6],this.cp[7]);
        stroke(this.color);
        strokeWeight(3);
        bezier(...this.cp);
        // beginShape();
        // for (let t = 0; t <= 1; t += delta) {
        //   let j = 1-t;
        //   vertex(this.cp[0]*j*j*j + this.cp[2]*3*t*j*j + this.cp[4]*3*t*t*j + this.cp[6]*t*t*t,
        //     this.cp[1]*j*j*j + this.cp[3]*3*t*j*j + this.cp[5]*3*t*t*j + this.cp[7]*t*t*t);
        // }
        // endShape();
      }
      // start() {
      //   // start the optimizer
      //   this.optimizer = tf.train.adam(learningRate);
      //   this.optimizer.minimize(lossFunction(this));
      // }
    }
    lines.push(new Line());
  }
  // for (let line of lines) {
  //   line.start();
  // }
}

function lossFunction(line) {
  return () => tf.norm(line.curve_points.sub(line.coefficients.dot(line.control_points)),2);
}


function draw() {
  background(0);
  stroke(255);
  for (let line of lines) {
    line.dataSync();
    line.draw();
    tf.tidy(() => optimizer.minimize(lossFunction(line),line.control_points));
  }
  fill(255);
  noStroke();
  if (debug) text(`using ${tf.memory().numTensors} tensors`,5,20);
  if (debug) text(`and ${tf.memory().numBytes} bytes`,5,40);

}
