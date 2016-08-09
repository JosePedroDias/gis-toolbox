'use strict';

const geo = require('../modules/geo');
const heightTile = require('../modules/heightTile');



function map1(v) {
  if (v < 0) { v = 0; }
  v /= 10;
  if (v > 255) { v = 255; }
  return [v, v, v, 255]; // assumes height below 2550...
}

function map2(v) {
  if (v < 0) { v = 0; }
  return [Math.floor(v/256), v%256, 0, 255]; // encodes interval [0, 65792] in channels R and G
}



function dstFileFromXYZ(x, y, z) {
  //return `${z}_${x}_${y}.png`;
  return `height2/${x}/${y}.png`;
}



// precomputed using geotiffLimits.js
/*
{ 'srtm/srtm_30_05.tif': { x: [ 412, 427 ], y: [ 618, 636 ] },
  'srtm/srtm_31_05.tif': { x: [ 427, 441 ], y: [ 618, 636 ] },
  'srtm/srtm_33_06.tif': { x: [ 455, 469 ], y: [ 602, 618 ] },
  'srtm/srtm_35_04.tif': { x: [ 484, 498 ], y: [ 636, 656 ] },
  'srtm/srtm_35_05.tif': { x: [ 484, 498 ], y: [ 618, 636 ] } }
*/
function electGeotiff(x, y) {
  let f;
       if (x >= 412 && x < 427 && y >= 618 && y < 636) { f = '30_05'; }
  else if (x >= 427 && x < 441 && y >= 618 && y < 636) { f = '31_05'; }
  else if (x >= 455 && x < 469 && y >= 602 && y < 618) { f = '33_06'; }

  else if (x >= 484 && x < 498 && y >= 636 && y < 656) { f = '35_04'; }
  else if (x >= 484 && x < 498 && y >= 618 && y < 636) { f = '35_05'; }

  else if (x >= 484 && x < 498 && y >= 618 && y <= 636) { f = '35_05'; }
  else if (x >= 484 && x < 498 && y >= 636 && y < 656) { f = '35_04'; }

  if (f) { return `srtm/srtm_${f}.tif`; }
}


const zoom = 10;



const xtasks = [
  {x:487, y:625}, // lagos
  {x:463, y:610}, // madeira
  {x:485, y:631}  // lagos
];



function seq(s, e) {
  const n = e - s + 1;
  const arr = new Array(n);
  for (let i = 0; i < n; ++i) {
    arr[i] = i + s;
  }
  return arr;
}

const tasks = [];

function addRect(minX, maxX, minY, maxY) {
  const xInt = seq(minX, maxX);
  const yInt = seq(minY, maxY);
  let x, y;
  for (y of yInt) {
    for (x of xInt) {
      tasks.push({x:x, y:y});
    }
  }
}

//addRect(485, 490, 625, 627);

//addRect(480,495, 624,647); // pt cont
addRect(480,495, 636,636); // pt cont transition 04-05
//addRect(416,447, 624,639); // açores
//addRect(456,471, 608,615); // madeira



function runTask(err) {
  if (err) { throw err; }

  const t = tasks.shift();

  if (!t) { return console.log('all done'); }
  console.log('left: %s | doing: %s,%s', tasks.length, t.x, t.y);

  const tif = electGeotiff(t.x, t.y);
  if (!tif) {
    //throw 'No geotiff file mapping ' + t.x + ', ' + t.y + '!';
    console.log('Skipping ' + t.x + ', ' + t.y + ' - no geotiff found!');
    return runTask();
  }
  //console.log(tif);

  heightTile(tif, t.x, t.y, zoom, map2, dstFileFromXYZ(t.x, t.y, zoom), runTask);
}

runTask();
