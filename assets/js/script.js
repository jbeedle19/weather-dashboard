// Variables:
//var searchInput = document.querySelector("#cityName");
var city = "Philadelphia";
var apiKey = "f6fb688c99006ae63bed987a2574a6d4";
var forecastApiKey = "c6f2b718e0bbb599b19005c4584b35bc";
var apiURLCurrent =  "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
var apiURLForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + forecastApiKey;
var currentDate = moment().format("M/D/YYYY"); 

// Functions:
// Function for the current weather to display
function currentWeather() {
    fetch(apiURLCurrent)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        var cityDateIcon = response.name + " (" + currentDate + ") " + response.weather[0].icon;
            $("#cityDateIcon").text(cityDateIcon);
        var currentTemp = response.main.temp + "°F";
            $("#currentTemp").text(currentTemp);
        var currentHMD = response.main.humidity + "%";
            $("#currentHMD").text(currentHMD);
        var windSpeed = response.wind.speed + " MPH";
            $("#windSpeed").text(windSpeed);
        fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + apiKey)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var uvIndex = response.value
            if (uvIndex < 3) {
                $("#uvIndex")
                .addClass("favorable")
            } else if (uvIndex < 7) {
                $("#uvIndex")
                .removeClass()
                .addClass("moderate") 
            } else if (uvIndex >= 7) {
                $("#uvIndex")
                .removeClass()
                .addClass("severe")
            } 
            $("#uvIndex").text(uvIndex) 
            //WORKING ON DISPLAYING DATA BASED ON USER INPUT AND 
            //DISPLAYING SEARCH HISTORY
        });
    })
}

// Function for the 5-day forecast
function forecast() {
    fetch(apiURLForecast)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        $(".card-deck").html('');
        // For loop to loop through and display 5-day forecast
        for (var i = 4; i < 37; i += 8) {    
            var forecastDate = moment(response.list[i].dt_txt).format("M/D/YYYY");
            var forecastIcon = response.list[i].weather[0].icon;
            var forecastTemp = "TEMP: "+ response.list[i].main.temp + "°F";
            var forecastHMD = "HMD: " + response.list[i].main.humidity + "%";
            var forecastHTML = '<div class="card text-white bg-primary p-2">' +
                            '<p class="card-title h5">' + forecastDate + '</p>' +
                            '<p class="card-text">' + forecastIcon + '</p>' +
                            '<p class="card-text">' + forecastTemp + '</p>' +
                            '<p class="card-text">' + forecastHMD + '</p>' +
                           '</div>';
        $(".card-deck").append(forecastHTML);
        }
    });
}


function searchHistory() {
    // Function to save the things being typed into the search field and also display them in a list underneath
}

// Event Listeners:
$("#citySearchForm").on("submit", function(event) {
    event.preventDefault();
    currentWeather();
    forecast();
});