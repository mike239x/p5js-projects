// This is a min-heap, so given the standard cmp function with cmp(a,b) = a-b
// and integers it will have element with minimal value on top.
class Heap {
  constructor(cmp) {
    this.length = 0;
    this.cmp = cmp;
  }
  isEmpty() { return this.length === 0; }
  top () { return this[1]; }
  push(obj) {
    this.length++;
    let cur = this.length;
    this[cur] = obj;
    // sift up
    while (cur > 1) {
      let next = floor(cur/2);
      if (this.cmp(this[cur],this[next]) >= 0) return;
      this.swap(cur, next);
      cur = next;
    }
  }
  pop(i) {
    if (i == undefined) i = 1;
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.length--;
      let result = this[1];
      delete this[1];
      return result;
    }
    let result = this[i];
    swap(i,this.length);
    delete this[this.length];
    this.length--;
    // sift down
    let cur = i;
    while (1) {
      let left = 2*cur;
      let right = 2*cur+1;
      if (this[right] != undefined)
        if (this.cmp(this[right], this[left]) < 0 &&
            this.cmp(this[right], this[cur]) < 0) {
          this.swap(right, cur);
          cur = right;
          continue;
        }
      if (this[left] != undefined)
        if (this.cmp(this[left], this[cur]) < 0) {
          this.swap(left, cur);
          cur = left;
          continue;
        }
      return result;
    }
  }
  swap(i,j) {
    const tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
  }
}
