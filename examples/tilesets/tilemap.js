// TODO: mb later make it a proper module

//TODO: transform comments above methods into doc-strings

const _ = undefined;

// soft wrap of a 2D array
class Array2D {

  constructor (w, h) {
    this.width = w;
    this.height = h;
    this.data = [];
    for (let i = 0; i < w; i++) {
      this.data.push((new Array(h)).fill(0));
    }
    this.outside = undefined;
  }

  load (a) {
    let i = 0, j = 0;
    for (let line of a) {
      i = 0;
      for (let c of line) {
        this.data[i][j] = c;
        i++;
      }
      j++;
    }
  }

  fill (x) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.data[i][j] = x;
      }
    }
  }

  random () {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.data[i][j] = round(random(0,1));
      }
    }
  }

  // tries to set data[i][j] to c, returns 1 if anything changed
  set (c, i, j) {
    if (i >= 0 && j >= 0 && i < this.width && j < this.height) {
      if (this.data[i][j] == c) return 0;
      this.data[i][j] = c;
      return 1;
    }
    return undefined;
  }

  // tries to retrieve data[i][j], if out of bounds returns default value
  get (i,j) {
    if (i >= 0 && j >= 0 && i < this.width && j < this.height) {
      return this.data[i][j];
    } else {
      return this.outside;
    }
  }

  // a pattern looks like this:
  // [[ _ , 0 , _ ],
  //  [ 0 , 1 , 2 ],
  //  [ _ , 1 , 0 ]]
  // here _ = undefined and matches everything
  matches(pattern, i, j) {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (pattern[y][x] == undefined) continue;
        if (pattern[y][x] != this.get(i+x-1,j+y-1)) return false;
      }
    }
    return true;
  }

  filter (f) {
    if (f == undefined) {
      f = x => x; // can also be used for copying
    }
    let re = new Map(this.width, this.height);
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        re.data[i][j] = f(this.data[i][j]);
      }
    }
    return re;
  }

  [Symbol.iterator] () {
    return this.data[Symbol.iterator]();
  }
  // or also:
  // *[Symbol.iterator] () {
  //   for (let c of this.data) yield c;
  // }

}

class Tiles extends Array2D {

  // this requires a p5.js framework
  constructor(tileset, tilesize, width, height) {
    super(width, height);
    this.ts = tilesize;
    this.img = createGraphics(tilesize*width,tilesize*height);
    //TODO: find out if graphics or image is better
    this.tileset = tileset;
    this.tileset.loadPixels();
    let w = round(this.tileset.width / tilesize);
    let h = round(this.tileset.height / tilesize);
    this.indexOf = {};
    let k = 0;
    //index all the tiles, from top to bottom left to right
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        this.indexOf[k] = {
          x : i,
          y : j
        }
        k++;
      }
    };
  }

  // set the tile at (x,y) to t
  // `soft` setting means if you try to put the same tile where it was, you do nothing
  // `hard` setting may be useful if you changed the tile names and
  // want to set different tile which has the same name as the last one
  set(t, x, y, soft = true) {
    let q = super.set(t,x,y);
    if (q == undefined) return undefined;
    if (soft && q == 0) return 0;
    let i = this.indexOf[t].x;
    let j = this.indexOf[t].y;
    let s = this.ts;
    this.img.loadPixels();
    for (let a = 0; a < s; a++) {
      for (let b = 0; b < s; b++) {
        for (let k = 0 ; k < 4; k++) {
          this.img.pixels[4*((y*s+a)*this.img.width + x*s + b) + k] =
            this.tileset.pixels[4*((j*s+a)*this.tileset.width + i*s + b) + k];
        }
      }
    }
    this.img.updatePixels();
    return 1;
  }

  compile () {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let t = this.data[x][y];
        let i = this.indexOf[t].x;
        let j = this.indexOf[t].y;
        let s = this.ts;
        this.img.loadPixels();
        for (let a = 0; a < s; a++) {
          for (let b = 0; b < s; b++) {
            for (let k = 0 ; k < 4; k++) {
              this.img.pixels[4*((y*s+a)*this.img.width + x*s + b) + k] =
                this.tileset.pixels[4*((j*s+a)*this.tileset.width + i*s + b) + k];
            }
          }
        }
        this.img.updatePixels();
      }
    }
  }

  // draw the tilemap
  // x and y be the screen position
  // cx and cy be the cell to focus on
  // scale is the scale (greater than zero)
  draw (x, y, cx = -0.5, cy = -0.5, scale = 1) {
    image(this.img,
      x - (cx+0.5) * this.ts * scale,
      y - (cy+0.5) * this.ts * scale,
      this.img.width * scale,
      this.img.height * scale
    );
  }

}

// a wrap for 2d array with a tileset for displaying
// and a set of rules for the tilemap generation
class Layer extends Array2D {

  constructor (tileset, tilesize, width, height) {
    super(width,height);
    this.tiles = new Tiles(tileset, tilesize, width, height);
    this.rules = [
      { pattern : [[_,_,_],[_,1,_],[_,_,_]],
        tile : 1 },
      { pattern : [[_,_,_],[_,0,_],[_,_,_]],
        tile : 0 }
    ];
  }

  compile () {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        for (let r of this.rules) {
          if (this.matches(r.pattern, i, j)) {
            this.tiles.set(r.tile, i, j);
            break;
          }
        }
      }
    }
  }

  // recompile means immediately apply changes to the tiles
  // use recompile = false to postpone the changes to tiles
  // so you can use compile later on
  set (c, i, j, recompile = true) {
    let q = super.set(c,i,j);
    if (q == undefined) return undefined;
    if (q == 0) return 0;
    if (recompile) {
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (i+x-1 >= 0 && j+y-1 >= 0 && i+x-1 < this.width && j+y-1 < this.height) {
            for (let r of this.rules) {
              if (this.matches(r.pattern, i+x-1,j+y-1)) {
                this.tiles.set(r.tile,i+x-1,j+y-1);
                break;
              }
            }
          }
        }
      }
    }
    return 1;
  }

  draw (x, y, cx = -0.5, cy = -0.5, scale = 1) {
    this.tiles.draw(x, y, cx, cy, scale);
  }

}

class Map extends Array2D {

  // here tilesize is the expected tilesize
  // (in case different layers have different ts)
  constructor (tilesize, w,h) {
    super(w,h);
    this.ts = tilesize;
    this.layers = [];
    // constructor (tileset, tilesize, width, height) {
  }

  compile() {
    for (let layer of this.layers) {
      layer.load(this.filter(layer.filter));
      layer.compile();
    }
  }

  set (c, i, j) {
    let q = super.set(c,i,j);
    if (q == undefined) return undefined;
    if (q == 0) return 0;
    for (let layer of this.layers) {
      layer.set(layer.filter(c),i,j);
    }
  }

  //TODO: think if the scale is needed
  draw (x, y, cx, cy, scale) {
    for (let layer of this.layers) {
      layer.draw(x,y,cx,cy,scale*this.ts/layer.tiles.ts);
    }
  }

}
