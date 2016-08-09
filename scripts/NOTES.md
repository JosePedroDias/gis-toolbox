# data sources

https://github.com/UDST/vizicities

https://mapzen.com/projects/vector-tiles/

http://osm2vectortiles.org/

https://osm2vectortiles-downloads.os.zhdk.cloud.switch.ch/v2.0/extracts/portugal.mbtiles

http://osm2vectortiles.tileserver.com/v1.json

http://osm2vectortiles.org/maps/

http://osm2vectortiles-0.tileserver.com/v2/14/7798/6370.pbf

http://www.webgis.com/glcc.html

http://www.webgis.com/srtm3.html
http://dds.cr.usgs.gov/srtm/version2_1/Documentation/Continent_def.gif


SRTM!

download geotiff data from:

http://dwtkns.com/srtm/


brew install gdal

https://svn.osgeo.org/gdal/trunk/gdal/swig/python/scripts/gdal2tiles.py

gdal2tiles --profile=mercator -z 1-8 yourmap.tif outputfolder

gdal2tiles.py -w none --verbose --profile=mercator --resume -z 10 -a 0,0,0 srtm_35_04.tif srtm
gdal2tiles.py -w none --verbose --profile=mercator --resume -z 10 -a 0,0,0 srtm_35_05.tif srtm

gdal2tiles.py -w none --profile=geodetic --resume -z 10 -a 0,0,0 srtm_35_04.tif srtm2
gdal2tiles.py -w none --profile=geodetic --resume -z 10 -a 0,0,0 srtm_35_05.tif srtm2

./g2t.py srtm_33_06.tif -a 0,0,0 srtm3


gdalsrsinfo assets/srtm/srtm_33_06.tif

referencial info


gdalinfo -mm srtm_33_06.tif

value limits


gdallocationinfo -xml -wgs84 srtm_33_06.tif -16.9429108 32.7576411

reads height at point


http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/
find tile
get lat lon limits

WGS84 datum (longitude/latitude):
-8.7890625 36.87962060502676
-8.4375 37.16031654673677



gdalwarp srtm_35_05.tif -r bilinear -te -8.7890625 36.87962060502676 -8.4375 37.16031654673677 10_487_625.tif
gdal_translate -scale -outsize 256 256 10_487_625.tif 10_487_625b.tif
gdal_translate -ot UInt16 -of png 10_487_625b.tif 10_487_625c.png




https://alastaira.wordpress.com/2013/11/12/importing-dem-terrain-heightmaps-for-unity-using-gdal/


http://blog.thematicmapping.org/2012/06/creating-color-relief-and-slope-shading.html





gdal_translate -of XYZ 625.tif 625.xyz



gdalwarp -s_srs EPSG:4326 -t_srs EPSG:3857 -r bilinear \
    -te -20037508.34 -20037508.34 20037508.34 20037508.34 \
    NE2_LR_LC_SR_W.tif natural-earth-2-mercator.tif

http://www.gdal.org/gdalwarp.html

Let’s go through what each piece of that command means. A full description of the gdalwarp command options can be found in the GDAL documentation.

-s_srs means “source spatial reference system” - this is the projection that the flle you are starting with is stored in, which in the case of Natural Earth is EPSG:4326.

-t_srs means “target spatial reference system” - this is the projection that you want to convert the datasource to. For any raster file you want to use with TileMill this should be EPSG:3857.

-r bilinear is telling the program what resampling interpolation method to use. If you want the command to run faster and don’t mind a rougher-looking output, choose near instead of bilinear. If you don’t mind waiting longer for very high-quality output, choose lanczos.

-te -20037508.34 -20037508.34 20037508.34 20037508.34 is telling the program the desired “target extent” of our output file. This is necessary because the Natural Earth geotiff contains data outside the bounds that the web mercator projection is intended to display. The WGS 84 projection can safely contain data all the way to 90° North & South, while web mercator is really only intended to display data up to about 85.05° North & South. The four big numbers after -te represent the western, southern, eastern and northern limits (respectively) of a web mercator map.

If you are working with raster data of a smaller area you will need to make sure that these numbers are adjusted to reflect the area it represents. If that area that does not go too far north or south, you can safely omit this entire option.

LR_LC_SR_W.tif is our original file, and natural-earth-2-mercator.tif is the name of the new file the program will create.

Depending on the size of your file and the resampling method you choose, gdalwarp can take a few seconds to a few hours to do its job. With the cubic resampling method on the medium Natural Earth will should a few minutes or less.
