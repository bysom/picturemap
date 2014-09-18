#!/usr/bin/python

# This file extracts EXIF-Data from the Pictures in ./pics and builds GeoJSON files from it.


import os
import json

path = os.path.abspath(".")
pathpics = os.path.abspath("./pics")


def scanfolder(url):
    os.chdir(url)
    dirs = os.listdir(".")
    print(url)
    for adir in dirs:
        nurl = url + "/" + adir
        if (os.path.isdir(nurl)) and nurl is not "thumb":
            scanfolder(nurl)
        else:
            if not (os.path.exists(url+"/thumb")):
                os.mkdir("thumb")
            os.system("exiftool -b -ThumbnailImage " + adir + " > " + "thumb/" + adir)
def generateGeoJSON():
    json_data=open(path + "/tmp/exif.json").read()
    data = json.loads(json_data)
    geojsonmeta = {"type": "FeatureCollection"}
    geojson = []
    for dataset in data:
        print ( "und " + dataset["SourceFile"])
        if "EXIF" in dataset:
            feature = {'type': "Feature", "geometry": {"type": "Point", "coordinates": [dataset["EXIF"]["GPSLongitude"], dataset["EXIF"]["GPSLatitude"]]}, "properties": dataset}
            geojson.append(feature)
    geojsonmeta["features"] = geojson
    geojsonf = json.dumps(geojsonmeta)
    os.system("rm " + path + "/data/fotos.geojson")
    geojson_data = open(path + "/data/fotos.geojson", "w")
    geojson_data.write(geojsonf)
    geojson_data.close()


print("Extrahiere EXIF-Daten...")
os.system("exiftool -n -r -g -json ./pics/* > tmp/exif.json")

print("Generiere daraus eine GeoJSON-Datei mit Liebe ...")
generateGeoJSON()

# Wechselt das Verzeichnis beim Durchlaufen
print("Erzeuge Thumbnails...")
scanfolder(pathpics)

print("Aufraeumen...")
os.system("rm " + path + "/tmp/exif.json")
print("Ende")

