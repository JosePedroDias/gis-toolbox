'use strict';

const fs = require('fs');
const PNG = require('node-png').PNG;




function mergePngs(f1, f2, f3) {
  fs.createReadStream(f1)
    .pipe(new PNG({filterType: 4}))
    .on('parsed', function() {
      console.log('%s loaded', f1);
      const p1 = this;

      fs.createReadStream(f2)
      .pipe(new PNG({filterType: 4}))
      .on('parsed', function() {
        console.log('%s loaded', f2);
        const p2 = this;

        console.log('merging...');

        let x, y;
        for (y = 0; y < p1.height; y++) {
          for (x = 0; x < p1.width; x++) {
            let i = (p1.width * y + x) << 2;
            p1.data[i] = Math.max( p1.data[i] , p2.data[i] ); ++i;
            p1.data[i] = Math.max( p1.data[i] , p2.data[i] ); ++i;
            p1.data[i] = Math.max( p1.data[i] , p2.data[i] ); ++i;
            p1.data[i] = Math.max( p1.data[i] , p2.data[i] ); ++i;
          }
        }

        console.log('saving %s', f3);
        const stream = p1.pack().pipe(fs.createWriteStream(f3));
        stream.on('finish', function() {
          console.log('done');
        });
      });
    });
}


for (let i = 486; i <= 495; ++i) {
  mergePngs('height/'+i+'/636.png', 'height/'+i+'/636b.png', 'height/'+i+'/636.png');
}
