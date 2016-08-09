# GIS Toolbox

This is a series of experiments on GIS dev.

It features a bunch of one-shot experiments from the past,
some so-far unpublished node modules
and other scripting files I put up to generate [SRTM Height Map Tiles PT](https://github.com/JosePedroDias/gis-srtm-heightmap-tiles-pt).


## jsbin experiments

* [correct mercator local](http://rawgit.com/JosePedroDias/gis-toolbox/master/jsbins/garipe.html) - renders mercator persp data,
* [world geojson interpolate projections](http://rawgit.com/JosePedroDias/gis-toolbox/master/jsbins/gikega.html) - mercator/spherical mapping, interpolated,
* [world geojson render in canvas](http://rawgit.com/JosePedroDias/gis-toolbox/master/jsbins/wateji.html) - country lines mapped to spherical coords, animated,
* [mercator tile canvas](http://rawgit.com/JosePedroDias/gis-toolbox/master/jsbins/tijexe.html) - render OSM vector data via canvas, superimposed with OSM tile.


## modules

* [geo](modules/geo.js) - functions to convert data between mercator tile canvas and the lat-lon referential.
* [heightTile](modules/heightTile.js) - computes a tile image encoding altitude data, mostly from GDAL tools.


## scripts

An assortment of scripts.
The most relevant one is [`heightTileBatch.js`](scripts/heightTileBatch.js), used to compute most of the tiles.
Remaining ones are calculation steps and experiments.
