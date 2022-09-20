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
  return `${day},${hours}:${minutes}`;
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
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response);

  document.querySelector("#textDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#highTem").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#lowTem").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#windSp").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
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
let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
searchCity("Lviv");
