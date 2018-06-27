const run = function () {
// runs straight as far as it can. then changes strats
  let x = this.x;
  let y = this.y;
  let dx = this.dx;
  let dy = this.dy;
  if (this.canGo(dx,dy)) {
    return [this.dx,this.dy];
  } else {
    this.changeStrats();
    return this.chooseDir();
  }
}

const lefty = function () {
  let x = this.x;
  let y = this.y;
  let dx = this.dy;
  let dy = -this.dx;
  for (let i = 0; i < 4; i++) {
    if (this.canGo(dx,dy)) return [dx,dy];
    tmp = [dx,dy];
    dx = -tmp[1];
    dy = tmp[0];
  }
  return [dx,dy];
}

const righty = function () {
  let x = this.x;
  let y = this.y;
  let dx = -this.dy;
  let dy = this.dx;
  for (let i = 0; i < 4; i++) {
    if (this.canGo(dx,dy)) return [dx,dy];
    tmp = [dx,dy];
    dx = tmp[1];
    dy = -tmp[0];
  }
  return [dx,dy];
}


class Tron {
  constructor(x,y, color) {
    this.strategies = [];
    this.x = x;
    this.y = y;
    let dir = [[0,1],[1,0],[-1,0],[0,-1]][floor(random(0,4))];
    this.dx = dir[0];
    this.dy = dir[1];
    this.color = color;
    // this.chooseDir
    // this.world
    this.addStrategy(run);
    this.addStrategy(lefty);
    // this.addStrategy(righty);
    this.changeStrats();
  }
  dir(dx,dy) {
    this.dx = dx;
    this.dy = dy;
  }
  canGo(dx,dy) {
    let x = this.x;
    let y = this.y;
    for (let i = 0; i < 2; i++) {
      if (''+this.world.get(x+dx,y+dy) != ''+[0,0,0,0]) {
        return false;
      }
      x += dx;
      y += dy;
    }
    return true;
  }
  move() {
    if (this.canGo(this.dx,this.dy)) {
      for (let i = 0; i < 2; i++) {
        this.x += this.dx;
        this.y += this.dy;
        this.world.set(this.x,this.y,this.color);
      }
    }
  }
  addStrategy(s) {
    this.strategies.push(s);
  }
  think() {
    // change the strategy with some prob
    if (random(0,1) > 0.995) {
      this.changeStrats();
    }
  }
  changeStrats() {
    let chosenStrats = this.strategies[rnd(0,this.strategies.length)];
    this.applyStrats(chosenStrats);
  }
  applyStrats(s) {
    this.chooseDir = () => s.call(this);
  }
}

class World {
  constructor(w,h) {
    this.w = w;
    this.h = h;
    this.img = createImage(w,h);
    this.img.loadPixels();
    this.trons = [];
  }

  get(x,y) {
    x = mod(x,this.w);
    y = mod(y,this.h);
    let i = (y*this.w+x)*4;
    return this.img.pixels.slice(i,i+4);
  }

  set(x,y, values) {
    x = mod(x,this.w);
    y = mod(y,this.h);
    let i = (y*this.w+x)*4;
    // console.log(x,y,i,values);
    for (let v of values) {
      this.img.pixels[i] = v;
      // console.log(`set pixels[${i}] to ${v}`);
      i++;
    }
  }

  add(...trons) {
    for (let tron of trons) {
      //TODO: mb link to this.img.pixels
      tron.world = this;
      this.trons.push(tron);
    }
  }

  update() {
    this.img.loadPixels();
    for (let t of this.trons) {
      // console.log(t.chooseDir());
      t.dir(...(t.chooseDir()));
      t.move();
      t.think();
    }
    this.img.updatePixels();
  }

}

function rnd(from,to) {
  return floor(random(from,to));
}

const mod = (x, n) => (x % n + n) % n
