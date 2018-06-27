const WIDTH = 600;
const HEIGHT = 400;

let world;
let paused = false;

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.mouseClicked(function ()  {
    // Add a new boid
    // boids.push(new Boid(mouseX, mouseY));
    paused = !paused;
    if (paused) {
      noLoop();
    } else {
      loop();
    }
  });
  world = new World(WIDTH, HEIGHT);
  world.add(new Tron(0,0,[255,0,0,255]));
  for (let i = 0; i < 20; i++) {
    let x = rnd(0,WIDTH);
    let y = rnd(0,HEIGHT);
    let c = [rnd(0,256),rnd(0,256),rnd(0,256),255];
    world.add(new Tron(x,y,c));
  }
}



function draw() {
  // console.log('drawing');
  background(0);
  image(world.img,0,0);
  world.update();
}
