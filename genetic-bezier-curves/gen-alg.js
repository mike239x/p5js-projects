class Evolution {
  constructor (creatureClass) {
    this.cr = creatureClass;
  }
  populate(size) {
    this.minSize = size;
    this.population = [];
    for (let i = 0; i < size; i++) {
      this.population.push(new this.cr());
    }
  }
  makeStep () {
    let val = [0];
    let v = 0;
    for (let c of this.population) {
      v += c.value();
      val.push(v);
    }
    let nextGen = [];
    while (nextGen.length < this.minSize) {
      let x = random(0,v);
      let momID = binSearch(val, x);
      let y = random(0,v);
      let dadID = binSearch(val, y);
      let mom = this.population[momID];
      let dad = this.population[dadID];
      nextGen.push(...this.cr.children(mom,dad));
    }
    this.population = nextGen;
  }
  best() {
    let re;
    let m = 0;
    for (let c of this.population) {
      if (c.value() > m) {
        re = c;
        m = c.value();
      }
    }
    if (re == undefined) {
      return new this.cr();
    } else {
      return re;
    }
  }
}


function EvolutionFactory(curve) {
  let cpn = 3;
  let std = 4;
  // let value = 10;
  class BCurve {
    constructor (empty = false) {
      if (!empty) {
        this.cp = [];
        for (let i = 0; i < cpn; i++) {
          this.cp.push(new p5.Vector(random(windowWidth),random(windowHeight)));
        }
      }
    }
    draw () {
      if (this.p == undefined) {
        this.compile();
      }
      noFill();
      beginShape();
      for (let p of this.p) {
        vertex(p.x,p.y);
      }
      endShape();
    }
    compile () {
      this.p = [];
      let delta = 0.02;
      for (let t = 0; t <= 1.0; t+=delta) {
        this.p.push(lerpfold(this.cp, t));
      }
    }
    static children(mom, dad) {
      if (random(0,1) > 0.95) return [new BCurve()];
      let re = new BCurve(true);
      re.cp = [];
      let x = 0;
      for (let i = 0; i < cpn; i++) {
        // let p = p5.Vector.lerp(mom.cp[i],dad.cp[i],0.5);
        let p = p5.Vector.lerp(mom.cp[i],dad.cp[i],x);
        x = 1-x;
        p.x += randomGaussian(0,std);
        p.y += randomGaussian(0,std);
        re.cp.push(p);
      }
      return [re];
    }
    calculateValue() {
      this.value_ = 1;
      let l = curve.length;
      for (let i = 0; i < l; i++) {
        let p = lerpfold(this.cp, i/(l-1));
        let d = dist(p.x,p.y,curve[i].x,curve[i].y);
        if (d == 0) {
          this.value_ += 1;
        } else {
          this.value_ += min(1,1/d);
        }
      }

    }
    value() {
      if (this.value_ == undefined) {
        this.calculateValue();
      }
      return this.value_;
    }
  }
  return new Evolution(BCurve);
}

function binSearch(arr, v, l, r) {
  if (l == undefined) l = 0;
  if (r == undefined) r = arr.length-1;
  if (l+1 == r) return l;
  if (l >= r) return -1;
  let m = Math.floor((l+r)/2);
  if (arr[m] < v) {
    return binSearch(arr, v, m, r);
  } else {
    return binSearch(arr, v, l, m);
  }
}
