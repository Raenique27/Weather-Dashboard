var cityName = document.querySelector("#city");
var search = document.querySelector("#search");
var searchBtn = document.querySelector("#searchBtn");
var searchHistory = document.querySelector("#history");
var savedCityBtn = document.querySelector("#savedCityBtn");
var searchedCity = document.querySelector("#searchedCity");
var cityDate = document.querySelector("#date");
var weatherIcon = document.querySelector("#weatherIcon");
var temp = document.querySelector("#temp");
var humidity = document.querySelector("#humidity");
var windSpeed = document.querySelector("#windSpeed");
var uvIndex = document.querySelector("#UV-index");
var forcast5 = document.querySelector("#forcast-5");
var forcastHeader = document.querySelector("#forcastHeader");
var cities = [];


var getCity = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8a42d43f7d7dc180da5b1e51890e67dc";

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var date = new Date(data.dt * 1000);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            cityName.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";

            weather(data);
        })
};

var weather = function (data) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=8a42d43f7d7dc180da5b1e51890e67dc";

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayCurrentWeather(data);
        })

}

var formSearchHandler = function (event) {
    event.preventDefault();

    var city = search.value.trim();

    if (city) {
        getCity(city);
        search.value = "";
    } else {
        alert("Please enter city name!");
    }
};

 var displayCurrentWeather = function (data) {
     console.log(data);

     // clear old content
     forcast5.textContent = "";

     weatherIcon.setAttribute("src","http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
     weatherIcon.setAttribute("alt", data.current.weather[0].description);
     temp.textContent = ` Temperature: ${data.current.temp}°F`;
     humidity.textContent = ` Humidity: ${data.current.humidity}%`;
     windSpeed.textContent = ` Windspeed: ${data.current.wind_speed} mph`;
     uvIndex.textContent = ` UV Index: ${data.current.uvi}`;
 };



searchBtn.addEventListener("click", formSearchHandler);