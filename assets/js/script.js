var searchInput = "Philadelphia"
var apiURLCurrent =  "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial&appid=f6fb688c99006ae63bed987a2574a6d4"
var apiURLForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&units=imperial&appid=f6fb688c99006ae63bed987a2574a6d4"
var apiURLIndex = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"
var currentDate = moment().format("M/D/YYYY") 

function currentWeather() {
    fetch(apiURLCurrent)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        console.log(response.name + " (" + currentDate + ") " + response.weather[0].icon);
        console.log(response.main.temp + "°F");
        console.log(response.main.humidity + "%");
        console.log(response.wind.speed + " MPH");
        //console.log("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=f6fb688c99006ae63bed987a2574a6d4")
        fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=f6fb688c99006ae63bed987a2574a6d4")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
        })
    })
}
currentWeather();