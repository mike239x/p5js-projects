let WIDTH = 640, HEIGHT = 448;
let mytiledmap;
let mymap;
let _ = undefined;
let rules;

let debug = false;

function preload() {
  mytiledmap = new Tilemap('pencil.png', 64, 10, 7);
}

let canvas;

function setup() {

    mymap = new Map(10,7);
    // mymap.load([
    //   [0,1,1,0,0,0,0,0,1,1],
    //   [1,1,1,0,0,0,0,1,1,1],
    //   [0,0,0,1,1,0,0,1,0,0],
    //   [0,0,1,1,1,0,0,0,0,0],
    //   [1,1,0,0,1,0,0,1,1,0],
    //   [1,1,1,0,0,0,1,1,1,0],
    //   [0,0,0,0,0,0,1,0,1,0]
    // ]);
    mymap.random();

    rules = [
      { pattern : [[1,1,1],[1,1,1],[1,1,1]],
        tile : 1 },
      { pattern : [[_,0,_],[0,1,1],[_,1,1]],
        tile : 16 },
      { pattern : [[_,0,_],[1,1,0],[1,1,_]],
        tile : 17 },
      { pattern : [[_,1,1],[0,1,1],[_,0,_]],
        tile : 32 },
      { pattern : [[1,1,_],[1,1,0],[_,0,_]],
        tile : 33 },
      { pattern : [[1,1,_],[1,1,0],[1,1,_]],
        tile : 48 },
      { pattern : [[_,0,_],[1,1,1],[1,1,1]],
        tile : 49 },
      { pattern : [[_,1,1],[0,1,1],[_,1,1]],
        tile : 64 },
      { pattern : [[1,1,1],[1,1,1],[_,0,_]],
        tile : 65 },
      { pattern : [[1,1,1],[1,1,1],[1,1,0]],
        tile : 80 },
      { pattern : [[1,1,1],[1,1,1],[0,1,1]],
        tile : 81 },
      { pattern : [[1,1,0],[1,1,1],[1,1,1]],
        tile : 96 },
      { pattern : [[0,1,1],[1,1,1],[1,1,1]],
        tile : 97 },
      { pattern : [[_,0,_],[1,1,1],[_,0,_]],
        tile : 112 },
      { pattern : [[_,1,_],[0,1,0],[_,1,_]],
        tile : 113 },
      { pattern : [[_,0,_],[0,1,1],[_,0,_]],
        tile : 128 },
      { pattern : [[_,1,_],[0,1,0],[_,0,_]],
        tile : 129 },
      { pattern : [[_,0,_],[0,1,0],[_,1,_]],
        tile : 144 },
      { pattern : [[_,0,_],[1,1,0],[_,0,_]],
        tile : 145 },
      { pattern : [[0,1,1],[1,1,1],[0,1,1]],
        tile : 160 },
      { pattern : [[1,1,1],[1,1,1],[0,1,0]],
        tile : 161 },
      { pattern : [[0,1,0],[1,1,1],[1,1,1]],
        tile : 176 },
      { pattern : [[1,1,0],[1,1,1],[1,1,0]],
        tile : 177 },
      { pattern : [[0,1,1],[1,1,1],[1,1,0]],
        tile : 192 },
      { pattern : [[1,1,0],[1,1,1],[0,1,1]],
        tile : 193 },
      { pattern : [[_,0,_],[0,1,0],[_,0,_]],
        tile : 208 },
      { pattern : [[0,1,0],[1,1,1],[0,1,0]],
        tile : 209 },
      { pattern : [[_,0,_],[0,1,1],[_,1,0]],
        tile : 224 },
      { pattern : [[_,0,_],[1,1,0],[0,1,_]],
        tile : 225 },
      { pattern : [[_,1,0],[0,1,1],[_,0,_]],
        tile : 240 },
      { pattern : [[0,1,_],[1,1,0],[_,0,_]],
        tile : 241 },
      { pattern : [[1,1,0],[1,1,1],[_,0,_]],
        tile : 26 },
      { pattern : [[0,1,1],[1,1,1],[_,0,_]],
        tile : 27 },
      { pattern : [[1,1,_],[1,1,0],[0,1,_]],
        tile : 28 },
      { pattern : [[_,1,1],[0,1,1],[_,1,0]],
        tile : 29 },
      { pattern : [[0,1,_],[1,1,0],[0,1,_]],
        tile : 30 },
      { pattern : [[_,0,_],[1,1,1],[0,1,0]],
        tile : 31 },
      { pattern : [[_,0,_],[1,1,1],[1,1,0]],
        tile : 42 },
      { pattern : [[_,0,_],[1,1,1],[0,1,1]],
        tile : 43 },
      { pattern : [[0,1,_],[1,1,0],[1,1,_]],
        tile : 44 },
      { pattern : [[_,1,0],[0,1,1],[_,1,1]],
        tile : 45 },
      { pattern : [[_,1,0],[0,1,1],[_,1,0]],
        tile : 46 },
      { pattern : [[0,1,0],[1,1,1],[_,0,_]],
        tile : 47 },
      { pattern : [[0,1,0],[1,1,1],[0,1,1]],
        tile : 186 },
      { pattern : [[0,1,1],[1,1,1],[0,1,0]],
        tile : 187 },
      { pattern : [[1,1,0],[1,1,1],[0,1,0]],
        tile : 188 },
      { pattern : [[0,1,0],[1,1,1],[1,1,0]],
        tile : 189 },
      { pattern : [[_,_,_],[_,0,_],[_,_,_]],
        tile : 0 }
    ];

    mytiledmap.generateFrom(rules,mymap);

    canvas = createCanvas(WIDTH,HEIGHT);

    canvas.mouseClicked(() => {
      let i = floor(map(mouseX, 0, WIDTH, 0, 10));
      let j = floor(map(mouseY, 0, HEIGHT, 0, 7));
      mymap.set(1-mymap.get(i,j),i,j);
      mytiledmap.generateFrom(rules,mymap);
    });

    let debugCheckbox = createCheckbox('debug mode', false);
    debugCheckbox.changed(() => {
      debug = debugCheckbox.checked();
    });

}

function loadTileset() {
  mytiledmap.load([
    [  0,  1, 16, 17, 32, 33, 48, 49, 64, 65],
    [ 80, 81, 96, 97,112,113,128,129,144,145],
    [160,161,176,177,192,193,208,209,224,225],
    [240,241, 26, 27, 28, 29, 30, 31, 42, 43],
    [44,45,46,47,186,187,188,189,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ]);
}

function draw() {
  background(255,0,0);
  mytiledmap.draw(0,0);
  if (debug) {
    for ( let i = 0; i < 10; i++) {
      for ( let j = 0; j < 7; j++) {
        text(mytiledmap.map[i][j],i*64+10,j*64+40);
      }
    }
  }
}
