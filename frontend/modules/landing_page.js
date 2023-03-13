import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities)
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let res = await fetch("http://3.111.73.229:8082/cities");
  let data = await res.json();
  return data;}
  catch(err){return null;}
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let cityCard=document.createElement("div");
  cityCard.className="col-xl-3 col-sm-6 col-12"
  cityCard.innerHTML=`
  
  <a href="pages/adventures/?city=${id}" id="${id}"><div class="tile">
        <img src="${image}" class="img-fluid h-100" >
          <p class="tile-text">
            <b>${city}</b></br>
            ${description}
          </p>
       </div></a>
  `
  let cityData = document.getElementById("data");
  cityData.append(cityCard);
}

export { init, fetchCities, addCityToDOM };
