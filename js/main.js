// var map = L.map('map');
var map = L.map('map').setView([53.9046, 8.5439], 12);
L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'examples.map-i86knfo3'
}).addTo(map);

function onEachFeature(feature, layer) {
	var popupContent = "<h4>"+feature.properties.File.FileName+"</h4>\n";
	popupContent += "<a href='"+feature.properties.File.Directory+"/"+feature.properties.File.FileName+"' target='_blank'><img src='"+feature.properties.File.Directory+"/thumb/"+feature.properties.File.FileName+"' alt='" + feature.properties.File.FileName + "'></a>"
	popupContent += "<dl>"
  	popupContent += "<dt>Blickwinkel</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.GPSImgDirection+"&deg;</dd>"
  	popupContent += "<dt>Bildmaße</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.ExifImageWidth+"x"+feature.properties.EXIF.ExifImageHeight+"</dd>"
  	popupContent += "<dt>Kamera</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.Model+"</dd>"
	popupContent += "</dl>"
	
	layer.bindPopup(popupContent);
	// var labeltext = labelText(feature.properties.left)
	// if(labeltext)
	// 	layer.bindLabel(labeltext, { noHide: true })
}

$.getJSON( "data/fotos.geojson", function( data ) {
    //Jetzt die Geodaten in die Karte packen
    L.geoJson(data, {
		style: function (feature) {
			return feature.properties && feature.properties.style;
		},

		onEachFeature: onEachFeature,

		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: 8,
				fillColor: "#ff7800",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
			});
		}
	}).addTo(map);
});