
const ACCESS_TOKEN = "pk.eyJ1IjoiLS1ub29yYS0tIiwiYSI6ImNrOXZjenJsMjAyZ2YzZXF2cXdlOWdyb2YifQ.0lB7Dif9aebdvihCFHU1Vg"; //'pk.eyJ1IjoiLS1ub29yYS0tIiwiYSI6ImNrOXZjenJsMjAyZ2YzZXF2cXdlOWdyb2YifQ.0lB7Dif9aebdvihCFHU1Vg';
const URL_TILELAYER = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";

export function displayMap(id, latitude, longitude) {
  var map = L.map(document.getElementById(id)).setView(
    [latitude, longitude],
    10
  );
  L.tileLayer(URL_TILELAYER,
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "--noora--/ck9vtg9ct00ia1iok7s1l577j", //--noora--/ck9vdmc2k0w5y1is3fdw8qkvg
      tileSize: 512,
      zoomOffset: -1,
      accessToken: ACCESS_TOKEN
        
    }
  ).addTo(map);

  return map;
}

export function addMarker(map, latitude, longitude) {
 
  const marker = L.marker([latitude, longitude]).addTo(map) 
  //.on('click', event => console.log(event))
  //.bindPopup("<b>You are here! :)</b>")
 // .openPopup();
 ; 
  map.setView([latitude, longitude], 13);
}
