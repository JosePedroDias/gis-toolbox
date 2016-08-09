'use strict';

const cp = require('child_process');
const gm = require('gm');



const zoom = 10;
const x = 463; const y = 610;



let cmd;

const srcTif = 'tmp_b.tif';
const cr = 'color_relief.txt';
const dstCR = 'tmp_cr.png';
const dstSL = `tmp_sl.png`;
const dstHS = `tmp_hs.png`;
const dst3 = `${zoom}_${x}_${y}_shaded.png`;



//cp.execSync('rm -f tmp_*');

cmd = `gdaldem color-relief ${srcTif} ${cr} -of png ${dstCR}`;
console.log(cmd); cp.execSync(cmd);

//cmd = `gdaldem slope ${srcTif} -of png ${dstSL}`;
//console.log(cmd); cp.execSync(cmd);

cmd = `gdaldem hillshade ${srcTif} -of png ${dstHS}`;
console.log(cmd); cp.execSync(cmd);

/*gm(dstCR)
.in(dstHS)
.compose('Multiply')*/


// TODO GM NOT WORKING AS EXPECTED

gm.composite(dstCR)
.in(dstHS)
.compose('Multiply')
.write(dst3, (err) => { if (err) { console.error(err); }});
