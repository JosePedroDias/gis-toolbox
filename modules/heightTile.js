'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const PNG = require('node-png').PNG;
const geo = require('./geo');

const tileSize = 256;



// https://gist.github.com/progrape/bbccda9adc8845c94a6f/
function mkdirp(dir, mode) {
  //console.log('dir:%s', dir);
  if (mode === undefined) { mode = 0o777; }
  try {
    fs.mkdirSync(dir, mode);
  }
  catch(ex) {
    //console.log(ex.errno);
    if (ex.errno === -2){
      mkdirp(path.dirname(dir), mode);
      mkdirp(dir, mode);
    }
  }
}



// x, y in TMS mode
function heightTile(srcTif, x, y, zoom, mappingFn, dstPng, cb) {
  //console.log('%s %s,%s %s -> %s', srcTif, x, y, zoom, dstPng);
  const bounds = geo.tileBoundsGoogle({x:x, y:geo.tmsToGoogleToggleY(y, zoom)}, zoom);
  const limits = [
    bounds.min.lat, bounds.max.lon,
    bounds.max.lat, bounds.min.lon
  ];

  let cmd;

  const dst0 = 'tmp_a.tif';
  const dst1 = 'tmp_b.tif';
  const dst2 = `tmp_c.xyz`;
  const dst3 = dstPng;

  cp.execSync('rm -f tmp_*');

  cmd = `gdalwarp ${srcTif} -r bilinear -te ${limits.join(' ')} ${dst0}`;
  // console.log(cmd);
  cp.execSync(cmd);

  cmd = `gdal_translate -outsize ${tileSize} ${tileSize} ${dst0} ${dst1}`;
  // console.log(cmd);
  cp.execSync(cmd);

  cmd = `gdal_translate -of xyz ${dst1} ${dst2}`;
  // console.log(cmd);
  cp.execSync(cmd);

  // load xyz data
  const W = tileSize;
  const H = tileSize;
  const s = fs.readFileSync(dst2).toString();
  const l = s.split('\n'); l.pop();
  const cells = l.map( a => parseFloat( a.split(' ')[2] ) );
  function lookup(x, y) { return cells[ W*y + x ]; }


  if (dst3.indexOf('/') !== -1) {
    mkdirp(path.dirname(dst3));
  }

  // save png file
  const png = new PNG({width:W, height:H});
  (function() {
    let x, y, i = 0;
    for (y = 0; y < H; ++y) {
      for (x = 0; x < W; ++x) {
        let v = lookup(x, y);
        v = mappingFn(v);
        png.data[i  ] = v[0];
        png.data[i+1] = v[1];
        png.data[i+2] = v[2];
        png.data[i+3] = v[3];
        i += 4;
      }
    }
  })();
  const stream = png.pack().pipe( fs.createWriteStream(dst3) );
  stream.on('finish', cb);
}



module.exports = heightTile;
