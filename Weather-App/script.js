const api = {
  API_KEY: "YOUR_API_KEY",
  BASE_URL: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
let city = document.querySelector(".location .city");
let date = document.querySelector(".location .date");
let temp = document.querySelector(".current .temp");
let weather_el = document.querySelector(".current .weather");
let hilow = document.querySelector(".hi-low");
const dateBuilder = (d) => {
  let months = [
    " January ",
    " February",
    " March",
    "April",
    "May ",
    "June",
    "July ",
    "August",
    " September",
    " October",
    "November",
    "December",
  ];
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    " Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};
const displayResult = (weather) => {
  city.innerText = `${weather.name} , ${weather.sys.country}`;
  let now = new Date();
  date.innerText = dateBuilder(now);

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  weather_el.innerText = weather.weather[0].main;

  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
};

const getResult = (query) => {
  fetch(`${api.BASE_URL}weather?q=${query}&units=metric&APPID=${api.API_KEY}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};

const setQuery = (event) => {
  if (event.keyCode == 13) {
    getResult(searchBox.value);
    console.log(searchBox.value);
  }
};
searchBox.addEventListener("keypress", setQuery);
