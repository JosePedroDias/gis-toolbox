'use strict';

const http = require('http');
const fs = require('fs');



const flatFilename = 'height/flat.png';

const head = {
  'Content-Type'                : 'image/png',
  'Access-Control-Allow-Origin' : '*'
};

http.createServer(function(req, res) {
  const parts = req.url.split(/[\/\.]/);
  parts.shift();

  const x = parts[0];
  const y = parts[1];
  const filename = `height/${x}/${y}.png`;
  // console.log(filename);

  fs.exists(filename, function(exists) {
    res.writeHead(200, head);
    fs.createReadStream(exists ? filename : flatFilename).pipe(res);
  });
}).listen(9999);
