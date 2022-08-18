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
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f58e39647952b54bd204a6b841a3ed8d`;

    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                    });
            } else {
                alert("Error cannot find city.");
            }
        })

        .catch(function (error) {
            alert("Cannot connect to server.");
        });
};

getCity();
