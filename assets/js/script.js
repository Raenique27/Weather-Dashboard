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

var getCity = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f58e39647952b54bd204a6b841a3ed8d";

    fetch(apiUrl)
        .then(function (response) {
            return response.json()
                .then(function (data) {
                   console.log(data); 
                });
        })

        .catch(function (error) {
            alert("Cannot connect to server");
        });
};

var weather = function(lat, long) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=f58e39647952b54bd204a6b841a3ed8d";

    fetch(weatherUrl)
        .then(function (response) {
            return response.json()
                .then(function (data) {
                    console.log(data);
                });
        })

        .catch(function (error) {
            alert("Cannot connect to server");
        });
};

var formSearchHandler = function(event) {
    event.preventDefault();

    var city = search.value.trim();

    if (city) {
        getCity(city);
        search.value = "";
    } else {
        alert("Please enter city name!");
    }
};

var displayForcast = function (data) {
    console.log(data);

    // clear old content
    forcast5.textContent = "";
    
    var date = new Date(data.dt *1000);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    cityName.innerHTML = data.name + "(" + month + "/" + day + "/" + year + ")";

    
}




searchBtn.addEventListener("click", formSearchHandler);