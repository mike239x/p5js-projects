let WIDTH;
let HEIGHT;

let A,B,C,D,E;

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(WIDTH,HEIGHT);

  A = tf.variable(tf.scalar(2.5));
  B = tf.variable(tf.scalar(2.5));
  C = tf.variable(tf.scalar(0));
  D = tf.variable(tf.scalar(-2.5));
  E = tf.variable(tf.scalar(-2.5));
  //4x^2 + 4y^2 - 4x - 4y + 1

}

function draw() {


  // I couldn't figure out how to draw a conic
  // given the equation. And so we ended up with this.
  background(255);
  noStroke();
  let step = 30;
  for (let i = 0; i < WIDTH; i += step) {
    for (let j = 0; j < HEIGHT; j += step) {
      let a = A.dataSync();
      let b = B.dataSync();
      let c = C.dataSync();
      let d = D.dataSync();
      let e = E.dataSync();
      let Q = ((x,y) => abs(a*x*x+b*y*y+c*x*y+d*x+e*y+1));
      let x = map(i, 0, WIDTH-1, 0, 1);
      let y = map(j, HEIGHT-1, 0, 0, 1);
      let q = Q(x,y);
      fill(q*1500);
      // if (q < 0.1) {
      //     fill(0);
      // } else {
      //   fill(255);
      // }
      ellipse(i,j,20);
    }
  }
}
