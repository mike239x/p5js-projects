const BASIC_PENCIL = [
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

const RED_PENCIL = [
  { pattern : [[1,1,1],[1,1,1],[1,1,1]],
    tile : 4 },
  { pattern : [[_,0,_],[0,1,1],[_,1,1]],
    tile : 20 },
  { pattern : [[_,0,_],[1,1,0],[1,1,_]],
    tile : 21 },
  { pattern : [[_,1,1],[0,1,1],[_,0,_]],
    tile : 36 },
  { pattern : [[1,1,_],[1,1,0],[_,0,_]],
    tile : 37 },
  { pattern : [[1,1,_],[1,1,0],[1,1,_]],
    tile : 52 },
  { pattern : [[_,0,_],[1,1,1],[1,1,1]],
    tile : 53 },
  { pattern : [[_,1,1],[0,1,1],[_,1,1]],
    tile : 68 },
  { pattern : [[1,1,1],[1,1,1],[_,0,_]],
    tile : 69 },
  { pattern : [[1,1,1],[1,1,1],[1,1,0]],
    tile : 84 },
  { pattern : [[1,1,1],[1,1,1],[0,1,1]],
    tile : 85 },
  { pattern : [[1,1,0],[1,1,1],[1,1,1]],
    tile : 100 },
  { pattern : [[0,1,1],[1,1,1],[1,1,1]],
    tile : 101 },
  { pattern : [[_,0,_],[1,1,1],[_,0,_]],
    tile : 116 },
  { pattern : [[_,1,_],[0,1,0],[_,1,_]],
    tile : 117 },
  { pattern : [[_,0,_],[0,1,1],[_,0,_]],
    tile : 132 },
  { pattern : [[_,1,_],[0,1,0],[_,0,_]],
    tile : 133 },
  { pattern : [[_,0,_],[0,1,0],[_,1,_]],
    tile : 148 },
  { pattern : [[_,0,_],[1,1,0],[_,0,_]],
    tile : 149 },
  { pattern : [[0,1,1],[1,1,1],[0,1,1]],
    tile : 164 },
  { pattern : [[1,1,1],[1,1,1],[0,1,0]],
    tile : 165 },
  { pattern : [[0,1,0],[1,1,1],[1,1,1]],
    tile : 180 },
  { pattern : [[1,1,0],[1,1,1],[1,1,0]],
    tile : 181 },
  { pattern : [[0,1,1],[1,1,1],[1,1,0]],
    tile : 196 },
  { pattern : [[1,1,0],[1,1,1],[0,1,1]],
    tile : 197 },
  { pattern : [[_,0,_],[0,1,0],[_,0,_]],
    tile : 212 },
  { pattern : [[0,1,0],[1,1,1],[0,1,0]],
    tile : 213 },
  { pattern : [[_,0,_],[0,1,1],[_,1,0]],
    tile : 228 },
  { pattern : [[_,0,_],[1,1,0],[0,1,_]],
    tile : 229 },
  { pattern : [[_,1,0],[0,1,1],[_,0,_]],
    tile : 244 },
  { pattern : [[0,1,_],[1,1,0],[_,0,_]],
    tile : 245 },
  { pattern : [[1,1,0],[1,1,1],[_,0,_]],
    tile : 26+64 },
  { pattern : [[0,1,1],[1,1,1],[_,0,_]],
    tile : 27+64 },
  { pattern : [[1,1,_],[1,1,0],[0,1,_]],
    tile : 28+64 },
  { pattern : [[_,1,1],[0,1,1],[_,1,0]],
    tile : 29+64 },
  { pattern : [[0,1,_],[1,1,0],[0,1,_]],
    tile : 30+64 },
  { pattern : [[_,0,_],[1,1,1],[0,1,0]],
    tile : 31+64 },
  { pattern : [[_,0,_],[1,1,1],[1,1,0]],
    tile : 42+64 },
  { pattern : [[_,0,_],[1,1,1],[0,1,1]],
    tile : 43+64 },
  { pattern : [[0,1,_],[1,1,0],[1,1,_]],
    tile : 44+64 },
  { pattern : [[_,1,0],[0,1,1],[_,1,1]],
    tile : 45+64 },
  { pattern : [[_,1,0],[0,1,1],[_,1,0]],
    tile : 46+64 },
  { pattern : [[0,1,0],[1,1,1],[_,0,_]],
    tile : 47+64 },
  { pattern : [[0,1,0],[1,1,1],[0,1,1]],
    tile : 186+32 },
  { pattern : [[0,1,1],[1,1,1],[0,1,0]],
    tile : 187+32 },
  { pattern : [[1,1,0],[1,1,1],[0,1,0]],
    tile : 188+32 },
  { pattern : [[0,1,0],[1,1,1],[1,1,0]],
    tile : 189+32 },
  { pattern : [[_,_,_],[_,0,_],[_,_,_]],
    tile : 0 }
];
