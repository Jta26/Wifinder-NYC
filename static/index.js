$jq = jQuery.noConflict();
var map = L.map('map').setView([40, -73], 13)

// create the tile layer with correct attribution
var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, attribution: osmAttrib});		
map.setView(new L.LatLng(40.736462, -73.973007), 12);
map.addLayer(osm);
var wifiMarkers = [];
var marker = L.circle(map.getCenter(), {
    color: '#0069ed',
    fillColor: '#0069ed',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map)

map.on('move', (e) => {
    marker.setLatLng(map.getCenter());
    $jq('#coordinates-x').html("X: " + map.getCenter().lat);
    $jq('#coordinates-y').html("Y: " + map.getCenter().lng);
});

$jq(document).ready(() => {
    console.log('read');
})

function Rouse() {
    var loading = document.getElementById('loading');
    var btn = document.getElementById('btnRouse');
    loading.style.visibility = 'visible';
    loading.style.display = 'block';
    console.log('test')
    btn.style.visibility = 'hidden';
    btn.style.display = 'none';
    data = {
        // "lat" : $jq('#coordinates-x').text(),
        "lat": map.getCenter().lat,
        "lon" : map.getCenter().lng
    }
    $jq.ajax({
        url: '/wifinder',
        type: 'POST',
        data: JSON.stringify(data),
        datatype: 'json',
        contentType: "application/json;charset=utf-8",
        success: (data) => {
            clearMarkers();
            data.forEach(point => {
                console.log(point);
                point[0] = parseFloat(point[0]);
                point[1] = parseFloat(point[1])
                placePoint(point[0], point[1], point[3], point[4]);
            });
            loading.style.visibility = 'hidden';
            loading.style.display = 'none';
            btn.style.visibility = 'visible';
            btn.style.display = 'block';
        },
        error: (request, err) => {
            loading.style.visibility = 'hidden';
            loading.style.display = 'none';
            btn.style.visibility = 'visible';
            btn.style.display = 'block';
            console.log(JSON.stringify(request));
        }
    })
};



function placePoint(lat, lon, SSID, desc) {
    console.log(lat, lon)
    var newMarker = L.marker([lat, lon]).addTo(map);
    newMarker.bindPopup('<p>SSID: ' + SSID + '</p> <p>Details:  ' + desc + '</p>');
    wifiMarkers.push(newMarker);

}

function clearMarkers() {
    for(var i = 0; i < this.wifiMarkers.length; i++) {
        this.map.removeLayer(this.wifiMarkers[i])
    }
}