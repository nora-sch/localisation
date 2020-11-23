// -FUNCTIONS-
/*
function saveDataToLocalStorage (key, value) {
    const jsonData = JSON.stringify(value);
    window.localStorage.setItem(key, jsonData);
}

function loadDataFromLocalStorage (key) {
    const jsonData = localStorage.getItem(key);
    return JSON.parse(jsonData);
}
 // ou 
 /*
saveDataToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  loadDataFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  
  }
*/
// ou
//on export ce constante pour pouvoir l'utiliser dans le script general (js_geolocalisation_nora.js), comme on a enlevé le lien de script dans notre code html
export const STORAGE = {

  save: (key, value) => {
      const jsonData = JSON.stringify(value);
      window.localStorage.setItem(key, jsonData);
  },
  
  load: key => {
      const jsonData = localStorage.getItem(key);
      return JSON.parse(jsonData);
  }
};
