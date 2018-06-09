// TODO: mb later make it a proper module
class Tilemap {
  // this requires a p5.js framework
  constructor(tileset, tilesize, width, height) {
    this.ts = tilesize;
    this.img = createGraphics(tilesize*width,tilesize*height);
    //TODO: find out if graphics or image is better
    this.map = [];
    this.width = width;
    this.height = height;
    for (let i = 0; i < width; i++) {
      this.map.push((new Array(height)).fill(0));
    }
    this.center = {
      x : -0.5,
      y : -0.5
    };
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
  // load the map from the given 2D array
  load(a) {
    let i,j;
    j = 0;
    for (let line of a) {
      i = 0;
      for (let c of line) {
        this.set(c,i,j);
        i++;
      }
      j++;
    }
  }
  // set the tile at (x,y) to t
  // `soft` setting means if you try to put the same tile where it was, you do nothing
  set(t, x,y, soft = true) {
    if (soft && this.map[x][y] == t) return;
    this.map[x][y] = t;
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
  // draw the tilemap
  draw(x,y) {
    image(this.img, x - (this.center.x+0.5) * this.ts, y - (this.center.y+0.5) * this.ts);
  }

  center(i,j) {
    this.center = {
      x : i,
      y : j
    };
  }

  //TODO: mb rename this
  // takes patterns and the map to generate tiles
  // all the patterns look like this:
  // {
  //   pattern : <obj>,
  //   tile : "tilename"
  // }
  // for each tile the patterns are looked left to right and after
  // the first matching pattern is met the tile is changed and it goes further
  // if no patterns are matched tile is unchanged
  // P.S. uses soft setting
  generateFrom(rules, map) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        for (let x of rules) {
          if (map.matches(x.pattern, i,j)) {
            this.set(x.tile,i,j);
            break;
          }
        }
      }
    }
  }
}

// a wrap for 2d array

class Map {

  constructor(w,h) {
    this.width = w;
    this.height = h;
    this.data = [];
    for (let i = 0; i < w; i++) {
      this.data.push((new Array(h)).fill(0));
    }
    this.outside = 0;
  }

  load(a) {
    let i,j;
    j = 0;
    for (let line of a) {
      i = 0;
      for (let c of line) {
        this.set(c,i,j);
        i++;
      }
      j++;
    }
  }

  random() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.data[i][j] = round(random(0,1));
      }
    }
  }


  fill (x) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.data[i][j] = x;
      }
    }
  }

  set (x, i, j) {
    if (i >= 0 && j >= 0 && i < this.width && j < this.height) {
      this.data[i][j] = x;
      return 1;
    }
  }

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
}
