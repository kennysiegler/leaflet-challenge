
url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5`

let myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 2
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);



d3.json(url).then(function(data){
console.log(data)
depth_list = []
    for (let i = 0;i<data.features.length;i++) {
        lat = data.features[i].geometry.coordinates[1]
        lon = data.features[i].geometry.coordinates[0]
        depth = data.features[i].geometry.coordinates[2]
        depth_list.push(depth)
        
        var circle = L.circle([lat, lon], {
            color: calcColor(depth),
            fillColor: calcColor(depth),
            fillOpacity: 0.5,
            radius: data.features[i].properties.mag * 100000
        }).addTo(myMap).bindPopup(`<h6>Location: ${data.features[i].properties.place}</h6><h6>Latitude: ${lat}</h6><h6>Longitude: ${lon}</h6><h6>Magnitude: ${data.features[i].properties.mag}</h6>`);
    }
    console.log(depth_list.sort(function(a,b) { return a - b;}))
})

function calcColor(depth) {

    if (200 < depth) {
        
        return '#5d8700'
    } else if (100 < depth && depth < 200) {
        return '#82b300'
    } else if (50 < depth && depth < 100) {
        return '#a5d721'
    } else if (25 < depth && depth < 50) {
        return '#Beed53'
    } else {
        return '#D6FA8C'
    }
    
}

// -3 -> 653
// 5 colors

// under 0 == light blue
// 0 - 3.5 = light green
// 3.5 - 10 = yellow
// 10 - 25 = orange
// > 25 = red
var unixTimestamp = 1651822834;

var date = new Date(unixTimestamp * 1000);

console.log(date.toLocaleDateString("en-US"));   // Prints: 5/6/2022
