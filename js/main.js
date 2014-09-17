// var map = L.map('map');

var bobbels = new L.MarkerClusterGroup({ spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true, maxClusterRadius: 50 });
var markers = new L.LayerGroup();

var picsWAngle;

var hikebike = L.tileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'examples.map-i86knfo3'
})
var osmbw = L.tileLayer('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
})
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
})
var seamarks = L.tileLayer('http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Seamarks © <a href="http://www.openseamap.org">openseamap.org</a>'

})

var map = L.map('map', {
	center: [53.9046, 8.5439],
	zoom: 12,
	layers: [hikebike, seamarks, bobbels]
});

var baseLayers = {
	"Hike & Bike": hikebike,
	"OSM (B&W)": osmbw,
	"OSM (farbig)": osm
}
var overlays = {
	"Seezeichen": seamarks,
	"Fotos (Bobbels)": bobbels,
	"Alle Fotos": markers
}

L.control.layers(baseLayers, overlays).addTo(map);
var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});

var info = L.control({
	"position": "topleft"
});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this._div.id = "info"
    this._div.innerHTML = '<h4 onclick="info.update()">&lt;</h4>';
    // $("#info").on("click",info.update)
    return this._div;
};

info.update = function (props) {
	if(this._div.innerHTML === '<h4 onclick="info.update()">&gt;</h4>')
    	this._div.innerHTML = '<h4 onclick="info.update()">&lt;</h4>';
    else
    	this._div.innerHTML = '<h4 onclick="info.update()">&gt;</h4>';
    sidebar.toggle();
};


info.addTo(map);



map.addControl(sidebar);
sidebar.toggle();



function loadImage(path, img){
	// $.getJSON(path+"/"+img, function(data){
		$("#picmodal").html("<a href='"+path+"/"+img+"' target='_blank'><img src='"+path+"/"+img+"' class='pic' width=95% alt='Foto'></a>")
	// })
}

function getPictureAngle(focalLength){
	return (2*Math.atan(35/(2*focalLength)))
}

function inDegree(radians){
	return radians * 180 / Math.PI;
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        color: 'yellow',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    var layer = e.target;

    layer.setStyle({
        color: 'blue',
        fillOpacity: 0.2
    });

    // if (!L.Browser.ie && !L.Browser.opera) {
    //     layer.bringToFront();
    // }
}

function getPopupContent(feature){
	popupContent = "<h4>"+feature.properties.File.FileName+"</h4>\n";
	popupContent += "<div class='zoombox'><a data-toggle=\"modal\" data-target=\".bs-example-modal-lg\" href='' onclick='loadImage(\""+feature.properties.File.Directory+"\",  \""+feature.properties.File.FileName+"\")'><img src='"+feature.properties.File.Directory+"/thumb/"+feature.properties.File.FileName+"' alt='" + feature.properties.File.FileName + "' class=\"img-thumbnail\"><span class=\"zooming glyphicon glyphicon-zoom-in\"></span></a></div>" //"+feature.properties.File.Directory+"/"+feature.properties.File.FileName+"
	popupContent += "<dl>"
  	popupContent += "<dt>Blickwinkel</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.GPSImgDirection+"&deg;</dd>"
  	popupContent += "<dt>Bildmaße</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.ExifImageWidth+"x"+feature.properties.EXIF.ExifImageHeight+"</dd>"
  	popupContent += "<dt>Brennweite (35mm)</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.FocalLengthIn35mmFormat+"</dd>"
  	popupContent += "<dt>Bildwinkel</dt>"
  	popupContent += "<dd>"+Math.round(inDegree(getPictureAngle(feature.properties.EXIF.FocalLengthIn35mmFormat)))+"&deg;</dd>"
  	popupContent += "<dt>Satelliten</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.GPSSatellites+"</dd>"
  	popupContent += "<dt>Kamera</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.Model+"</dd>"
	popupContent += "</dl>"
	return popupContent
}

function updateFSidebar(path, img){
	console.log("poff")
	info.update()
	loadImage(path,img)
	$(".bs-example-modal-lg") .modal('toggle')
}

function onEachFeature(feature, layer) {
	var popupContent = getPopupContent(feature)
	
	layer.bindPopup(popupContent);

	var labeltext = "<img src='"+feature.properties.File.Directory+"/thumb/"+feature.properties.File.FileName+"' alt='" + feature.properties.File.FileName + "'>"
	if(labeltext)
		layer.bindLabel(labeltext, { noHide: false })
}

function onEachFeatureWA(feature, layer) {
	var popupContent = getPopupContent(feature)
	
	layer.bindPopup(popupContent);

	var labeltext = "<img src='"+feature.properties.File.Directory+"/thumb/"+feature.properties.File.FileName+"' alt='" + feature.properties.File.FileName + "'>"
	if(labeltext)
		layer.bindLabel(labeltext, { noHide: false })
	layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
        // click: zoomToFeature
    });
}

$.getJSON( "data/fotos.geojson", function( data ) {
    //Jetzt die Geodaten in die Karte packen
    L.geoJson(data, {
		style: function (feature) {
			return feature.properties && feature.properties.style;
		},

		onEachFeature: onEachFeature,

	}).addTo(bobbels);

	picsWAngle = L.geoJson(data, {
		style: function (feature) {
			return feature.properties && feature.properties.style;
		},

		onEachFeature: onEachFeatureWA,

		pointToLayer: function (feature, latlng) {
			var marker1 = L.marker(latlng)

			var radius = Math.sqrt((3000*2)/(getPictureAngle(feature.properties.EXIF.FocalLengthIn35mmFormat)))
			
			var angle = L.circle(latlng, radius, {
				stroke: false
			}).setDirection(feature.properties.EXIF.GPSImgDirection, inDegree(getPictureAngle(feature.properties.EXIF.FocalLengthIn35mmFormat)))

			return L.featureGroup([marker1, angle])
		}

	}).addTo(markers);

	for (var i = 0; i < data.features.length; i++) {
		var element = "<div class='sidebarelement media'>"
		element += "<a href='#' data-toggle=\"modal\" class='pull-left' data-target=\".bs-example-modal-lg\" onclick='updateFSidebar(\""+data.features[i].properties.File.Directory+"\",\""+data.features[i].properties.File.FileName+"\")'><img src='"+data.features[i].properties.File.Directory+"/thumb/"+data.features[i].properties.File.FileName+"' class=\"img-rounded\" alt='Bild'></a>"
		element += "<div class='media-body'><dl>"
		element += "<dt>Bild</dt>"
	  	element += "<dd>"+data.features[i].properties.File.FileName+"</dd>"
	  	element += "<dt>Zeit</dt>"
	  	element += "<dd>"+data.features[i].properties.EXIF.DateTimeOriginal+"</dd>"
	  	element += "<dt>Koordinaten</dt>"
	  	element += "<dd>"+data.features[i].properties.EXIF.GPSLatitude+" "+data.features[i].properties.EXIF.GPSLatitudeRef+"<br>"+data.features[i].properties.EXIF.GPSLongitude+" "+data.features[i].properties.EXIF.GPSLongitudeRef+"</dd>"
		element += "</dl></div>"
		element += "</div>"
		$("#sidebarfoo").append(element)
	};


});