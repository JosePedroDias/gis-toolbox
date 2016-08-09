# GIS Toolbox

This is a series of experiments on GIS dev.

It features a bunch of one-shot experiments from the past,
some so-far unpublished node modules
and other scripting files I put up to generate [SRTM Height Map Tiles PT](https://github.com/JosePedroDias/gis-srtm-heightmap-tiles-pt).


## jsbin experiments

* [correct mercator local](garipe.html) - renders mercator persp data,
* [world geojson interpolate projections](gikega.html) - mercator/spherical mapping, interpolated,
* [world geojson render in canvas](wateji.html) - country lines mapped to spherical coords, animated,
* [mercator tile canvas](tijexe.html) - render OSM vector data via canvas, superimposed with OSM tile.


## modules

* geo - functions to convert data between mercator tile canvas and the lat-lon referential.
* heightTile - computes a tile image encoding altitude data, mostly from GDAL tools.


## scripts

An assortment of scripts.
The most relevant one is `heightTileBatch.js`, used to compute most of the tiles.
Remaining ones are calculation steps and experiments.
