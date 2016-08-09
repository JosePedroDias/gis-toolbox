'use strict';

const cp = require('child_process');
const geo = require('../modules/geo');



function geotiffLimits(geotiffFile) {
  const o = cp.execSync(`gdalinfo ${geotiffFile}`).toString();

  /*
  ...
  Upper Left  ( -20.0004164,  35.0004166) (...
  ...
  Lower Right ( -14.9995831,  29.9995833) (...
  ...
  */

  let m = (/^Upper Left\s*\(\s*([^,]+),\s*([^\)]+)/m).exec(o);
  const lon0 = parseFloat(m[1]);
  const lat0 = parseFloat(m[2]);
  //console.log(lon0, lat0);

  m = (/^Lower Right\s*\(\s*([^,]+),\s*([^\)]+)/m).exec(o);
  const lon1 = parseFloat(m[1]);
  const lat1 = parseFloat(m[2]);
  //console.log(lon1, lat1);

  return {
    min: {lat:lat0, lon:lon0},
    max: {lat:lat1, lon:lon1}
  };
}



function orderedPair(a, b) {
  return [
    Math.min(a, b),
    Math.max(a, b)
  ];
}

function geotiffTiles(geotiffFile, zoom) {
  const lims = geotiffLimits(geotiffFile);
  const t0 = geo.tileIndicesTMS(lims.min, zoom);
  const t1 = geo.tileIndicesTMS(lims.max, zoom);
  //console.log(t0);
  //console.log(t1);
  return {
    x: orderedPair(t0.x, t1.x),
    y: orderedPair(t0.y, t1.y)
  };
}




const zoom = 10;
const tiffs = '30_05 31_05 33_06 35_04 35_05'.split(' ').map(f => `srtm/srtm_${f}.tif`);

const res = {};

tiffs.forEach(f => {
  const r = geotiffTiles(f, zoom);
  res[f] = r;
});

console.log(res);




//geotiffLimits('srtm/srtm_33_06.tif');
//console.log( geotiffTiles('srtm/srtm_33_06.tif', 10) );
