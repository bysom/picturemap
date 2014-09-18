picturemap
==========

See the positions and directrions of your Photographs.

##Installation
First you'll need a (normal) webserver, exiftool and bower.
You can install bower via nodejs/npm with
```sh
sudo npm install -g bower
````

Then clone this project and install dependencies.
```
git clone https://github.com/bysom/picturemap.git
cd picturemap
bower install
cd 3rd_party
git clone https://github.com/jieter/Leaflet-semicircle.git
git clone https://github.com/Turbo87/leaflet-sidebar.git
cd ..
```
Under ./pics should be your pictures. Change it.

```
rm pics
ln -s /path/to/your/pictures pics
python read.py # Python 3
```
Configure your webserver.

Done.
