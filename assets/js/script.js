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

     if (data.current.uvi <= 4) {
        uvIndex.setAttribute("class", "badge badge-success");
     } else if (data.current.uvi <= 8) {
        uvIndex.setAttribute("class", "badge badge-warning");
     } else {
        uvIndex.setAttribute("class", "badge badge-danger");
     }

     forcastHeader.textContent = "5-Day Forcast:";

     for (var i=1; i < 6; i++) {
        var date = new Date(data.daily[i].dt * 1000);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        var forcastDate = document.createElement("p");
        forcastDate.setAttribute("class", "mt-3 mb-0 forcastDate");
        forcastDate.innerHTML = month + "/" + day + "/" + year;

         var forcastDay = document.createElement("div");
         var forcastIcon = document.createElement("img");
         forcastIcon.setAttribute("class", "forcastImg");
         var forcastTemp = document.createElement("p");
         var forcastWind = document.createElement("p");
         var forcastHumid = document.createElement("p");

        forcastIcon.setAttribute("src","http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
        forcastIcon.setAttribute("alt", data.daily[i].weather[0].description);
        forcastTemp.textContent = `Temp: ${data.daily[i].temp.day} °F`;
        forcastWind.textContent = `Windspeed: ${data.daily[i].wind_speed} mph`;
        forcastHumid.textContent = `Humidity: ${data.daily[i].humidity}%`;

        forcastDay.setAttribute("class", "daysForcast");

        forcastDay.appendChild(forcastDate);
        forcastDay.appendChild(forcastIcon);
        forcastDay.appendChild(forcastTemp);
        forcastDay.appendChild(forcastWind);
        forcastDay.appendChild(forcastHumid);
        forcast5.appendChild(forcastDay);
     }
 };



searchBtn.addEventListener("click", formSearchHandler);