// var map = L.map('map');
var map = L.map('map').setView([53.9046, 8.5439], 12);
var markers = new L.MarkerClusterGroup({ spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true, maxClusterRadius: 50 });


L.tileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'examples.map-i86knfo3'
}).addTo(map);
map.addLayer(markers);

function loadImage(path, img){
	// $.getJSON(path+"/"+img, function(data){
		$("#picmodal").html("<a href='"+path+"/"+img+"' target='_blank'><img src='"+path+"/"+img+"' class='pic' width=95% alt='Foto'></a>")
	// })
}

function onEachFeature(feature, layer) {
	var popupContent = "<h4>"+feature.properties.File.FileName+"</h4>\n";
	popupContent += "<div class='zoombox'><a data-toggle=\"modal\" data-target=\".bs-example-modal-lg\" href='' onclick='loadImage(\""+feature.properties.File.Directory+"\",  \""+feature.properties.File.FileName+"\")'><img src='"+feature.properties.File.Directory+"/thumb/"+feature.properties.File.FileName+"' alt='" + feature.properties.File.FileName + "' class=\"img-thumbnail\"><span class=\"zooming glyphicon glyphicon-zoom-in\"></span></a></div>" //"+feature.properties.File.Directory+"/"+feature.properties.File.FileName+"
	popupContent += "<dl>"
  	popupContent += "<dt>Blickwinkel</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.GPSImgDirection+"&deg;</dd>"
  	popupContent += "<dt>Bildmaße</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.ExifImageWidth+"x"+feature.properties.EXIF.ExifImageHeight+"</dd>"
  	popupContent += "<dt>Kamera</dt>"
  	popupContent += "<dd>"+feature.properties.EXIF.Model+"</dd>"
	popupContent += "</dl>"
	
	layer.bindPopup(popupContent);
	var labeltext = "<img src='"+feature.properties.File.Directory+"/thumb/"+feature.properties.File.FileName+"' alt='" + feature.properties.File.FileName + "'>"
	if(labeltext)
		layer.bindLabel(labeltext, { noHide: false })
}

$.getJSON( "data/fotos.geojson", function( data ) {
    //Jetzt die Geodaten in die Karte packen
    L.geoJson(data, {
		style: function (feature) {
			return feature.properties && feature.properties.style;
		},

		onEachFeature: onEachFeature,

		// pointToLayer: function (feature, latlng) {
		// 	return L.circleMarker(latlng, {
		// 		radius: 8,
		// 		fillColor: "#ff7800",
		// 		color: "#000",
		// 		weight: 1,
		// 		opacity: 1,
		// 		fillOpacity: 0.8
		// 	});
		// }
	}).addTo(markers);
});