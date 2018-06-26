class GeoScribble extends Scribble {
  constructor(...args) {
    super(...args);
  }
  textFont(font) {
    if (font == undefined) {
      return this.font;
    }
    this.font = font;
    return this;
  }
  //TODO: make this into a docstring:
  // align: 0 for left, 0.5 for mid, 1 for right, can be anything else
  // hook: describes the position of the container that is displayed
  // in the given pos, f.e. hook = [0,0] would mean the top left corner
  // is right in the given position, [1,1] --- bottom right corner.
  //TODO: mb change that to something else:
  // hook = undefined would mean use normal hook
  // (by the baseline of the first line)
  text(obj, x, y, align = 0, hook) {
    let lines = (''+obj).split("\n");
    let boxes = [];
    let l = 0;
    for (let line of lines) {
      let b = font.textBounds(line,0,0);
      if (b.w > l) l = b.w;
      boxes.push(b);
    }
    let n = boxes.length;
    let container = {
      x : 0,
      y : boxes[0].y,
      w : l,
      h : (n-1)*this.sketch.textLeading() - boxes[0].y + boxes[n-1].y+boxes[n-1].h
      // or mb ... + max(0,boxes[n-1].y+boxes[n-1].h)
    };
    for (let b of boxes) {
      b.x = (l-b.w)*align;
    }
    let top = container.y;
    let bot = container.y + container.h;
    let left = container.x;
    let right = container.x + container.w;
    let d;
    if (hook == undefined) {
      d = [0,0];
    } else {
      d = [container.x + hook[0]*container.w,
           container.y + hook[1]*container.h];
    }
    for (let i = 0; i < n; i++) {
      this.sketch.text( lines[i],
        x + boxes[i].x - d[0],
        y - d[1] + i*this.sketch.textLeading() );
    }
  };
  dots(...dots) {
    for (let d of dots) {
      this.sketch.strokeWeight(2);
      this.sketch.stroke(0);
      this.sketch.fill(d.color_);
      this.scribbleEllipse(d.x,d.y,d.size_,d.size_);
      //TODO
      this.sketch.stroke(0);
      this.sketch.fill(0);
      // this.sketch.strokeWeight(1); // bold text
      this.sketch.strokeWeight(0.5); // normal text
      // this.sketch.noStroke(); // for some clean readable text
      this.text(
        d.label_,
        d.x+d.labelPos_.offset[0],
        d.y+d.labelPos_.offset[1],
        0,
        d.labelPos_.hook
      );
    }
  }
  chain(...dots) {
    let a = [];
    for (let d of dots) {
      if (d == undefined) {
        a = [];
      } else {
        a.push(d);
        if (a.length == 2) {
          this.scribbleLine(a[0].x,a[0].y,a[1].x,a[1].y);
          a.splice(0,1); // remove the first element
        }
      }
    }
  }
  fillPoly(gap, angle, ...dots) {
    let x = [];
    let y = [];
    for (let d of dots) {
      x.push(d.x);
      y.push(d.y);
    }
    this.scribbleFilling( x, y, gap, angle);
  }
  lines(...lines) {
    let top = new Line(0,1,0);
    let bot = new Line(0,1,this.sketch.height-1);
    let left = new Line(1,0,0);
    let right = new Line(1,0,this.sketch.width-1);
    for (let line of lines) {
      let l = line.intersect(left);
      if (l.y < 0) {
        l = line.intersect(top);
      } else if (l.y > this.sketch.height-1) {
        l = line.intersect(bot);
      }
      let r = line.intersect(right);
      if (r.y < 0) {
        r = line.intersect(top);
      } else if (r.y > this.sketch.height-1) {
        r = line.intersect(bot);
      }
      this.chain(l,r);
    }
  }
}

class Line {
  constructor(a = 0, b = 1, c = 0) { // ax+by = c, with hypot(a,b) = 1
    this.a = a;
    this.b = b;
    this.c = c;
  }
  normalize() {
    let c = hypot(this.a,this.b);
    if (this.c < 0) {
      c *= -1;
    }
    if (c == 0) {
      // mb also through an error here
      this.a = 0;
      this.b = 1;
      this.c = 0;
    } else {
      this.a /= c;
      this.b /= c;
      this.c /= c;
    }
    return this;
  }
  intersect(l) { //returns the point of intersection with line l
    let det = this.a*l.b - this.b*l.a;
    if (det == 0) return new Dot(0,0);
    // a b
    // c d
    let a = l.b;
    let b = -this.b;
    let c = -l.a;
    let d = this.a;
    let x = (a*this.c + b*l.c)/det;
    let y = (c*this.c + d*l.c)/det;
    return new Dot(x,y);
  }
}

class Dot {
  constructor(x = 0, y = 0, label = '', color = [0,0,0], size = 10) {
    this.label_ = label;
    this.labelPos_ = new StdLabelPos('BR');
    this.x = x;
    this.y = y;
    this.size_ = size;
    this.color_ = color;
  }
  pos(a,b) {
    if (a == undefined && b == undefined) {
      return [this.x,this.y];
    }
    if (a instanceof Dot && b == undefined) {
      this.x = a.x;
      this.y = a.y;
    } else if (a instanceof Array && a.length == 2 && b == undefined) {
      this.x = a[0];
      this.y = a[1];
    } else {
      this.x = a;
      this.y = b;
    }
    return this;
  }
  label(label) {
    if (label == undefined) {
      return this.label_;
    }
    this.label_ = label;
    return this;
  }
  size(size) {
    if (size == undefined) {
      return this.size_;
    }
    if (size <= 0) {
      size = 10;
    }
    let q = size/this.size_;
    if (this.labelPos_ != undefined) {
      this.labelPos_.offset[0] *= q;
      this.labelPos_.offset[1] *= q;
    }
    this.size_ = size;
    return this;
  }
  color(...col) {
    if (col.length == 0) {
      return this.color_;
    } else if (col.length == 3) {
      this.color_ = col;
    } else if (col.length == 1 && col[0] instanceof Array) {
      this.color_ = col[0];
    } else if (col.length == 1) {
      this.color_ = [col[0],col[0],col[0]];
    }
    return this;
  }
  labelPos(dir, margin = this.size_) {
    if (dir == undefined) {
      if (this.labelPos_ == undefined) return undefined;
      return this.labelPos_.name;
    }
    this.labelPos_ = new StdLabelPos(dir, margin);
    return this;
  }
  static mix(...param) {
    let dots = [];
    let coef = [];
    let tick = true;
    let s = 0;
    for (let obj of param) {
      if (tick) {
        dots.push(obj);
      } else {
        coef.push(obj);
        s += obj;
      }
      tick = !tick;
    }
    if (!tick) { // ended with a dot, making sum of coef = 1
      coef.push(1-s);
    }
    let x = 0;
    let y = 0;
    for (let i = 0; i < dots.length; i++) {
      x += dots[i].x * coef[i];
      y += dots[i].y * coef[i];
    }
    return new Dot(x,y);
  }
  connect(d) { // returns a line connecting this and dot d
    let a = d.y - this.y;
    let b = this.x - d.x;
    let c = Math.hypot(a,b);
    if (c == 0) {
      a = 0;
      b = 1;
    } else {
      a /= c;
      b /= c;
    }
    c = a*this.x + b*this.y;
    if (c < 0) {
      c *= -1;
      a *= -1;
      b *= -1;
    }
    return new Line(a,b,c);
  }
}

class StdLabelPos {
  constructor (dir, margin = 10) {
    this.name = dir;
    this.hook = [0.5,0.5];
    this.offset = [0,0];
    if (dir.indexOf('T') !== -1) {
      this.hook[1] = 1;
      this.offset[1] = -margin;
    } else if (dir.indexOf('B') !== -1) {
      this.hook[1] = 0;
      this.offset[1] = margin;
    }
    if (dir.indexOf('L') !== -1) {
      this.hook[0] = 1;
      this.offset[0] = -margin;
    } else if (dir.indexOf('R') !== -1) {
      this.hook[0] = 0;
      this.offset[0] = margin;
    }
  }
}

// function unzip(arr) {
//   let e = arr.length;
//   let l = arr[0].length;
//   let f = [];
//
//   for (var i = 0; i < l; i++) {
//     var tmp = [];
//     for (var j = 0; j < e; j++) {
//       tmp.push(arr[j][i]);
//     }
//     f.push(tmp);
//   }
//   print(f);
//   return f;
// };
