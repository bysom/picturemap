#!/usr/bin/python
import os

path = os.path.abspath("./pics")

def scanfolder(url):
    os.chdir(url)
    dirs = os.listdir()
    print(url)
    for adir in dirs:
        nurl = url + "/" + adir
        if (os.path.isdir(nurl)) and nurl is not "thumb":
            scanfolder(nurl)
        else:
            if not (os.path.exists(url+"/thumb")):
                os.mkdir("thumb")
            os.system("exiftool -b -ThumbnailImage " + adir + " > " + "thumb/" + adir)

scanfolder(path)