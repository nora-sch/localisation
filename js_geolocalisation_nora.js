// --------------- import de MODULES -----------------------------
// ---------------------------------------------------------------
//on importe module STORAGE de fichier utilities
import {STORAGE} from './utilities.js';
import {displayMap, addMarker} from './map.js';
import {getMeteo} from './meteo.js';
import {WEATHER_CODES} from './codes_meteo.js';

// ---------------------------------------------------------------

// CONSTANTES ET VARIABLES GLOBALES                        */
/***********************************************************/
const GPS='gps';
const DEFAULT_LAT = 48.858093;
const DEFAULT_LNG = 2.294694;

/*

 const button=document.querySelector("#geo-button");
 function onClickGeoButton(){
    if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        document.getElementById('para1a').textContent = "Latitude: ";
        document.getElementById('para2a').textContent = "Longitude: ";
        document.getElementById('para1').textContent = latitude;
        document.getElementById('para2').textContent = longitude;
        
      });
  } else {
    alert('geolocalisation indisponible')
  }
 };
*//*
// pour enregistrer des données dans le local storage
function saveDataToLocalStorage(key, value) {
  let localStorage=window.localStorage;
  localStorage.setItem(key, value);
};
// pour aller récupérer des données dans le local storage
function loadDataFromLocalStorage(key) {
  let localStorage=window.localStorage;
  localStorage.getItem(key);
  console.log(key);
};
saveDataToLocalStorage('Name', 'Alfred');
loadDataFromLocalStorage(key);


*/
/*

let localStorage=window.localStorage;
localStorage.setItem('Nom','Alfred');
let firstname =localStorage.getItem('Nom');
console.log(firstname);

//--------- tableau --------------
let prenom= ['Nora', 'Sylvie', 'Paula'];

localStorage.setItem('Name', prenom);
localStorage.getItem(prenom);
console.log(prenom);
//--------- objet --------------
const myObjet= new Object(); // ou const objet = {name: 'Nora', ville:'Aix-en-Provence'};
myObjet.name="Nora";
myObjet.ville="Aix-en-Provence";
myObjet.nationalite="lettonne";
*/
/*
let objetJson=JSON.stringify(myObjet);
localStorage.setItem('objet', objetJson);
let key=localStorage.getItem('objet');
console.log(JSON.parse(key));
*/
/*
saveDataToLocalStorage('objet', myObjet);
let res=loadDataFromLocalStorage('objet');
console.log(res);
*/

//-------------------- OLIVIER -------------------------------------------------------------------
/***********************************************************/
/* FONCTIONS 
/***********************************************************/
/*
//onClickGeoButton = () => {} ou
function onClickGeoButton() {

  // console.log('Bouton cliqué.');
   // On vérifie que l'API Géolocation est disponible dans le navigateur du client
   if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position){
        document.getElementById('lat').textContent = `Latitude: ${position.coords.latitude}`;
        document.getElementById('long').textContent = `Longitude: ${position.coords.longitude}`;
    });
}
else {
  console.error('API gelocation non disponible sur votre navigateur.');
}

}
*/
//-----------------------------------------------------------------------------------------
// avec PROMESSE---------------------------------------------------------------------------------
 

function getClientPosition() {
  return new Promise((resolve, reject) => {

     const gpsClient = STORAGE.load(GPS);
      console.log(gpsClient);

               // Si on récupère bien des coordonnées
               if (gpsClient !== null) {
                resolve(gpsClient);
                return;
            }
    // On vérifie que l'API Géolocation est disponible dans le navigateur du client
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
                    // Callback de succès
                    (position) => { 
        // Enregistrement des données dans le local storage
        const gpsClient = {
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude
      };

        STORAGE.save(GPS, gpsClient);
        //On résouds la promesse avec les coordonnées en valeur de succès
        resolve(gpsClient);  
      },
          // Callback d'échec
          error => {
            reject(error)}
  ), {
    //permet trouver un pouint localisation plus précis
    enableHighAccuracy: true
}
 } else {
      reject("API gelocation non disponible sur votre navigateur.");
    }
  });
}




function displayPosition(gpsClient) {
  //document.getElementById('lat').textContent = `Latitude: ${position.coords.latitude}`;
   // document.getElementById('long').textContent = `Longitude: ${position.coords.longitude}`;
    document.getElementById('lat').textContent = `Latitude: ${gpsClient.latitude}`;
    document.getElementById('long').textContent = `Longitude: ${gpsClient.longitude}`;

    return gpsClient}
  /* var myMap = L.map('map').setView([gpsClient.latitude, gpsClient.longitude], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',  {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: '--noora--/ck9vtg9ct00ia[gpsClient.latitude, gpsClient.longitude]1iok7s1l577j',  //--noora--/ck9vdmc2k0w5y1is3fdw8qkvg
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiLS1ub29yYS0tIiwiYSI6ImNrOXZjenJsMjAyZ2YzZXF2cXdlOWdyb2YifQ.0lB7Dif9aebdvihCFHU1Vg'//'pk.eyJ1IjoiLS1ub29yYS0tIiwiYSI6ImNrOXZjenJsMjAyZ2YzZXF2cXdlOWdyb2YifQ.0lB7Dif9aebdvihCFHU1Vg'
        }).addTo(myMap);

        var marker = L.marker([gpsClient.latitude, gpsClient.longitude]).addTo(myMap);
  }*/

 const onClickGeoButton = () => {

  // console.log('Bouton cliqué.');

  getClientPosition() 
   // .then( position => {
    //     document.getElementById('lat').textContent = `Latitude: ${position.coords.latitude}`;
    //      document.getElementById('long').textContent = `Longitude: ${position.coords.longitude}`;
    //  } )
       .then(displayPosition)
       .then( gpsClient => {
        addMarker(mapLocation, gpsClient.latitude, gpsClient.longitude);
        return getMeteo(gpsClient.latitude, gpsClient.longitude);
        
    }) .then( meteo => {
      // Récupération et traitement des données météo
      console.log(meteo);

  const weather = meteo.forecast[0].weather;
            const tmin = meteo.forecast[0].tmin;
            const tmax = meteo.forecast[0].tmax;

            document.querySelector('#tmin span').textContent = tmin;
            document.querySelector('#tmax span').textContent = tmax;
            document.getElementById('weather').textContent = WEATHER_CODES[weather];
            //cache paraghraphe de meteo s'il n y a pas des coordonees
            document.getElementById('meteo').classList.remove('hidden');

        })
        
   // .then(gpsClient => { displayMeteo("meteo", gpsClient.latitude, gpsClient.longitude)})
      // .then( param => { 
     //   addMarker(param, gpsClient.latitude, gpsClient.longitude); 
  //  } )
      
      // .catch( error => console.error(error) );
      // .catch(console.error);
    
      .catch(function(error){
          console.error(error);
      });
}

//--------- creation de PLAN / MAP ---------------
// initialize the map on the "map" div with a given center and zoom




/******************************** plusieur manieres comment écrire une fonction ******************************************/
/*function hello() {
  alert('Bonjour! :)');
}

hello = function() {
  alert('Bonjour! :)');
}
hello = () => alert('Bonjour! :)');

hello = () => {
    // FOnctions fléchée avec plusieurs instructions
}
//!!!S'il y a qu'un seule instruction ou un seule parametre on peut ne mettre pas des accolades et parenthèses , {}, ().
hello = firstname => alert('Bonjour ' + firstname + '! :)');

hello = (firstname, lastname) => alert('Bonjour ' + firstname + ' ' + lastname +'! :)');

console.log(hello('nora', 'sumane'));*/

// avec CALLBACKS------------------------------------------------------------------------------------------------------------
/*
function delay(callback, secondes) {
  setTimeout(callback, secondes * 1000);
}

delay( () => console.log('Terminé après 1 secondes!'), 1); 

*/
// avec PROMESSE-----------------------------------------------------------------------------------------------------------------
/*
function delay2(secondes) {

  return new Promise( (resolve, reject) => {

      // Dans le corps de la promesse, on fait l'action asynchrone
      setTimeout( () => {
          resolve('La promesse est résolue!!');
      }, secondes * 1000);
  });    
}
// Le .then() prend entre parenthèse une fonction qui récupère en paramètre la valeur de succès de la promesse,
// c'est-à-dire ce qu'on a mis en paramètre de resolve(), ici le message 'La promesse est résolue!!'
delay2(2).then( message => console.log(message) );
*/
//--------
/*
function delay3(secondes) {

  return new Promise( (resolve, reject) => {

      // Dans le corps de la promesse, on fait l'action asynchrone
      setTimeout( () => {
          // On tire un entier au hasard entre 1 et 10
          const n = Math.floor(Math.random() * 10) + 1;

          // Si cet entier est impair c'est gagné on résoud la promesse
          if (n % 2 !== 0) {
            resolve('Gagné avec ' + n + ' ! Nombre impair ! La promesse est résolue!!');
        } 
        // Sinon (si l'entier est pair)
        else {
            reject('Perdu avec ' + n + ' ! nombre pair... la promesse a échoué.');
        }
          
      }, secondes * 1000);
  });    
}
delay3(3)
    .then( message => console.log(message) )
    .catch( error => console.log('Erreur: ' + error) );

    */

/***********************************************************/
/* CODE PRINCIPAL                                          */
/***********************************************************/
const mapLocation=displayMap('map',DEFAULT_LAT,DEFAULT_LNG);
//const displayMeteo("meteo", DEFAULT_LAT,DEFAULT_LNG)

document
  .getElementById("geo-button")
  .addEventListener("click", onClickGeoButton);
  

