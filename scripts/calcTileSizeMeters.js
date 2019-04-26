const geo = require('../modules/geo')

const a = {lon:-17.2265625, lat:32.54681317351516};
const b = {lon:-16.875,     lat:32.84267363195431};

const lon_ = (a.lon + b.lon) / 2;
const lat_ = (a.lat + b.lat) / 2;

const d1 = geo.distance( {lon: lon_,  lat: a.lat}, {lon: lon_,  lat: b.lat} );
const d2 = geo.distance( {lon: a.lon, lat: lat_ }, {lon: b.lon, lat: lat_ } );
const dd = (d1 + d2) / 2;

console.log(d1, d2, dd);

// ~ 30Km ~ 30 000
// max H 1800
// max voxel height = 30000 (256)
// 
