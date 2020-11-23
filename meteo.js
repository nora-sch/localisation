import {WEATHER_CODES} from './codes_meteo.js';

const MON_TOKEN =  "cdb462480c575eac261230613af189bed1d4b56b20bd30228d240beae15b919c";
const API_BASE_URL = "https://api.meteo-concept.com/api";

// https://api.meteo-concept.com/api/forecast/nextHours/0?token={accessToken};
/*
export function getMeteo(latitude, longitude) {
  const endpoint = "/forecast/daily";
  // encodeURIComponent permet encoder des caracteres speciaux
  const url = `${API_BASE_URL}${endpoint}?token=${MON_TOKEN}&latlng=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;
  // Création de l'objet XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // Ouverture de la requête AJAX avec les paramètres : méthode HTTP et URL
  xhr.open("get", url);
  // J'écoute l'événement 'load'
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
  });
  // Envoi la requête
  xhr.send(null);
}
*/
// --promessiation de la fonction avec requête XMLHTTP !!!!!!!!!!!!!!!!!!!!!!!!!!! l'appel AJAX---

/*
export function getMeteo(latitude, longitude) {
    return new Promise( (resolve, reject) => {
        //si je veux que pour aujourd'hui:
    //  const enpoint=  "/forecast/daily/0";
    const endpoint = "/forecast/daily";
    // encodeURIComponent permet encoder des caracteres speciaux
    const url = `${API_BASE_URL}${endpoint}?token=${MON_TOKEN}&latlng=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    // Création de l'objet XMLHttpRequest
   const xhr = new XMLHttpRequest();
    // Ouverture de la requête AJAX avec les paramètres : méthode HTTP et URL
   xhr.open("get", url);
    // J'écoute l'événement 'load'
    xhr.addEventListener("load", () => {
      resolve(JSON.parse(xhr.response));
    });
    xhr.addEventListener('error', reject);
    // Envoi la requête
    xhr.send(null);
    
  })
};
*/
   
// --promessiation de la fonction avec FETCH !!!!!!!!!!!!!!!!!!! ---------------
/*
 export function getMeteo(latitude, longitude) {
  return new Promise( (resolve, reject) => {
      //si je veux que pour aujourd'hui:
  //  const enpoint=  "/forecast/daily/0";
  const endpoint = "/forecast/daily";
  // encodeURIComponent permet encoder des caracteres speciaux
  const url = `${API_BASE_URL}${endpoint}?token=${MON_TOKEN}&latlng=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
  
    fetch(url)
    .then(response => response.json())
    //.then(meteo => resolve(meteo))
    .then(resolve)
    .catch(reject);
  }) 
};
*/

// --promessiation de la fonction avec FETCH sans promesse en utilisant async / AWAIT  !!!!!!!!!!!!!!!!!!! ---------------

/**
 * 
 * Récupère les données météo et les retourne sous forme d'une promesse (fonction asynchrone)
 * @param {number} latitude 
 * @param {number} longitude 
 */

export async function getMeteo(latitude, longitude) {
    // Construction de l'URL qu'on va interroger en AJAX pour récupérer les données auprès de l'API Météo
  const endpoint = '/forecast/daily';
  const url = `${API_BASE_URL}${endpoint}?token=${MON_TOKEN}&latlng=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
 // On lance la requête AJAX vers l'URL, on attends la réponse à la requête qui sera stockée dans la variable response
  const response = await fetch(url);
  // On extrait les données de la réponse avec la méthode json(), on attend le résultat et on le stocke dans la variable meteo
  const meteo = await response.json();
  // On retourne l'objet contenant les données météo MAIS comme getMeteo est une FONCTION ASYNCHRONE, elle retournera automatiquement une promesse
  return meteo;    
}

