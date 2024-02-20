//vars
const apiKey = "";

const cityInput = document.querySelector("#input");
const searchButton = document.querySelector("#button");

const bottomCardElem = document.querySelector("#bottom-card");
const cityNameElem = document.querySelector("#city");
const countryElem = document.querySelector("#country");
const descriptionElem = document.querySelector("#description");
const IconElem = document.querySelector("#weatherIcon");
const tempElem = document.querySelector("#temp");
const tempMaxElem = document.querySelector("#temp-max");
const tempMinElem = document.querySelector("#temp-min");
const humidityElem = document.querySelector("#humidity span");
const windElem = document.querySelector("#wind span");

//functions
const getWeatherData = async(city) => {

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiURL);
    const data = await res.json();

    console.log(data);
    return data;
}



const showWeatherData = async(city) => {

    const data = await getWeatherData(city);

    cityNameElem.innerText = data.name;
    tempElem.innerText = parseInt(data.main.temp);
    tempMaxElem.innerHTML = parseInt(data.main.temp_max);
    tempMinElem.innerHTML = parseInt(data.main.temp_min);
    descriptionElem.innerText = data.weather[0].description;
    IconElem.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElem.setAttribute(
        "src", 
        `https://flagsapi.com/${data.sys.country}/flat/64.png`
    );
    humidityElem.innerText = `${data.main.humidity}%`;
    windElem.innerText = `${data.wind.speed}km/h`;

    bottomCardElem.classList.remove("hide");
}

//events
searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value; 
    showWeatherData(city);
})