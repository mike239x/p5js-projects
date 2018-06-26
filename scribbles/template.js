let geo;
let font;
const WIDTH = 640;
const HEIGHT = 448;
let seed = 0;

function preload() {
  font = loadFont("fonts/cmunss.otf");
}

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.mouseClicked(()=>console.log(++seed));
  textFont(font);
  textSize(16);
  geo = new GeoScribble();
  // .bowing = yourValue;          // changes the bowing of lines
  // .roughness = yourValue;       // changes the roughness of lines
  // .maxOffset = yourValue;       // coordinates will get an offset, here you define the max offset
  // .numEllipseSteps = yourValue; // defines how much curves will be used to draw an ellipse
}

function draw() {
  let _ = undefined;
  randomSeed(seed);
  background(255);

  // YOUR CODE GOES HERE (mostly)

}
