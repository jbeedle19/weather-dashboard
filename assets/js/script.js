// Variables:
var searchInput = "Philadelphia"
var apiURLCurrent =  "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial&appid=f6fb688c99006ae63bed987a2574a6d4"
var apiURLForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&units=imperial&appid=f6fb688c99006ae63bed987a2574a6d4"
var apiURLIndex = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"
var currentDate = moment().format("M/D/YYYY") 
//var 

// Functions:
function currentWeather() {
    fetch(apiURLCurrent)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        var cityDateIcon = response.name + " (" + currentDate + ") " + response.weather[0].icon;
        console.log(cityDateIcon);
        var currentTemp = response.main.temp + "°F";
            $("#currentTemp").append(currentTemp);
        console.log(currentTemp);
        var currentHMD = response.main.humidity + "%";
        console.log(currentHMD);
        var windSpeed = response.wind.speed + " MPH";
        console.log(windSpeed);
        //console.log("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=f6fb688c99006ae63bed987a2574a6d4")
        fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=f6fb688c99006ae63bed987a2574a6d4")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var uvIndex = response.value
            console.log(uvIndex);
        })
    })
}

function searchHistory() {
    // Function to save the things being typed into the search field and also display them in a list underneath
}

$("#citySearchForm").on("submit", function(event) {
    event.preventDefault();
    currentWeather();
    });