let WIDTH = 640, HEIGHT = 448;
let mymap;

let debug = false;
let pencil;

function preload() {
  pencil = loadImage('pencil.png');
}

let canvas;

function setup() {

    mymap = new Layer(pencil,64,10,7);
    mymap.outside = 0;
    mymap.random();
    mymap.rules = BASIC_PENCIL;
    mymap.compile();

    canvas = createCanvas(WIDTH,HEIGHT);

    canvas.mouseClicked(() => {
      let i = floor(map(mouseX, 0, WIDTH, 0, 10));
      let j = floor(map(mouseY, 0, HEIGHT, 0, 7));
      mymap.set(1-mymap.get(i,j),i,j);
      // mytiledmap.generateFrom(rules,mymap);
    });

    let debugCheckbox = createCheckbox('debug mode', false);
    debugCheckbox.changed(() => {
      debug = debugCheckbox.checked();
    });

}

// function loadTileset() {
//   mytiledmap.load([
//     [  0,  1, 16, 17, 32, 33, 48, 49, 64, 65],
//     [ 80, 81, 96, 97,112,113,128,129,144,145],
//     [160,161,176,177,192,193,208,209,224,225],
//     [240,241, 26, 27, 28, 29, 30, 31, 42, 43],
//     [44,45,46,47,186,187,188,189,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
//   ]);
// }

function draw() {
  background(255,0,0);
  mymap.draw(0,0);
  if (debug) {
    for ( let i = 0; i < 10; i++) {
      for ( let j = 0; j < 7; j++) {
        text(mymap.tiles.data[i][j],i*64+10,j*64+40);
      }
    }
  }
}
