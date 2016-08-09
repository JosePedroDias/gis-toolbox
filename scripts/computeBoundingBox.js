'use strict';

/*
pt cont
tms: 60,80 -> 61,78 (7)

açores
tms: 52,79 -> 55,78 (7)
104,159

madeira
tms: 57,76 -> 58,76 (7)
*/

function zoom(x1, y1, x2, y2, z) {
  if (z === 10) {
    //return [x1, y1, x2, y2];
    return [x1, x2, y1, y2];
  }
  return zoom(
    x1*2,
    y1*2,
    x2*2+1,
    y2*2+1,
    z+1
  );
}

console.log( zoom(60,78, 61,80, 7) ); // pt cont
console.log( zoom(52,78, 55,79, 7) ); // açores
console.log( zoom(57,76, 58,76, 7) ); // madeira
