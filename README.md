picturemap
==========

See the positions and directrions of your Photographs.

##Installation
First you'll need a (normal) webserver and bower.
You can install bower via nodejs with
```
sudo npm install -g bower
````

Then clone this project and install dependencies.
```
git clone https://github.com/bysom/picturemap.git
cd picturemap
bower install
cd 3rd_party
git pull
```
Under ./pics should be your pictures. Change it.

```
rm pics
ln -s /path/to/your/pictures pics
```
Configure your webserver.

Done.
