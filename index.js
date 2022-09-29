function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
let newData = document.querySelector(`#currentData`);
let currentTime = new Date();
newData.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#placeSearch").value;
  searchCity(city);
  searchCity("Lviv");
}

let form = document.querySelector(`#dataType`);
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#textDescription").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#windSp").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "bdc96064ff0660a2e7648f3da299d4f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
form.addEventListener("submit", search);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bdc96064ff0660a2e7648f3da299d4f3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function displayFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiuslink.classList.remove("active");
  farenheitlink.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  farenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);

let farenheitlink = document.querySelector("#fahrenheit-link");

farenheitlink.addEventListener("click", displayFarenheitTemp);
let celsiuslink = document.querySelector("#celsius-link");

celsiuslink.addEventListener("click", displayCelsiusTemp);
searchCity("Lviv");
