// Variables:
var apiKey = "f6fb688c99006ae63bed987a2574a6d4";
var forecastApiKey = "c6f2b718e0bbb599b19005c4584b35bc";
var currentDate = moment().format("M/D/YYYY");
var savedSearchHistory = JSON.parse(localStorage.getItem("history")) || [];

// Functions:
// Function for the current weather to display
function currentWeather(city) {
    var apiURLCurrent =  "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(apiURLCurrent)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(response) {
                var iconCode = response.weather[0].icon;
                var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                var cityDate = response.name + " (" + currentDate + ") ";
                var cityDateIconHTML = '<p class="h3 my-4 city-name" id="cityDateIcon">' + cityDate + '<img id="weatherIcon" src="' + iconURL+ '"/>'; 
                    $('#cityDateIcon').remove();
                    $("#currentWeatherContainer").prepend(cityDateIconHTML);
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
                        .removeClass()
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
                });
            });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Weather Report");
        });
};

// Function for the 5-day forecast
function forecast(city) {
    var apiURLForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + forecastApiKey;
    fetch(apiURLForecast)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(response) {
                $(".card-deck").html('');
                // For loop to loop through and display 5-day forecast
                for (var i = 5; i < 40; i += 8) {    
                    var forecastDate = moment(response.list[i].dt_txt).format("M/D/YYYY");
                    var forecastIcon = response.list[i].weather[0].icon;
                    var forecastIconURL = "http://openweathermap.org/img/wn/" + forecastIcon + ".png";
                    var forecastTemp = "TEMP: "+ response.list[i].main.temp + "°F";
                    var forecastHMD = "HMD: " + response.list[i].main.humidity + "%";
                    var forecastHTML = '<div class="col-md-6 col-lg-4 col-xl-3 py-2">' +
                                    '<div class="card text-white bg-primary p-2">' +
                                    '<p class="card-title h5">' + forecastDate + '</p>' +
                                    '<p class="card-text"><img id="weatherIcon" src="' + forecastIconURL + '"/></p>' +
                                    '<p class="card-text">' + forecastTemp + '</p>' +
                                    '<p class="card-text">' + forecastHMD + '</p>' +
                                '</div>' +
                                '</div>';
                $(".card-deck").append(forecastHTML);
                }
            });
        } else {
            return;
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Weather Report")
    })
}

// Function to prepend input into list so most recent search is always at the top
function searchHistory(city) {
    var api =  "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(api).then(function(response) {
        if (response.ok) {
            var liHTML = '<li class="list-group-item capitalize" id="searchHistory">' + city + '</li>';
                        $(".list-group").prepend(liHTML);
                        savedSearchHistory.unshift(city);
                        localStorage.setItem("history", JSON.stringify(savedSearchHistory));
                        // How to handle not saving duplicate cities?
        } else {
            return;
        }
    });
};

// Function to load search history when page loads/reloads
function loadSearchHistory() {
    for (var i = 0; i < savedSearchHistory.length; i++) {
        var cityHistoryLiHTML = '<li class="list-group-item capitalize" id="searchHistory">' + savedSearchHistory[i] + '</li>';
        $(".list-group").append(cityHistoryLiHTML);
    }
}

// Event Listeners:
// Listens for input to be submitted and runs weather functions
$("#citySearchForm").on("submit", function(event) {
    event.preventDefault();
    var searchedCity = $("#cityName").val();
    currentWeather(searchedCity);
    forecast(searchedCity);
    searchHistory(searchedCity);
    $("#searchHistory").siblings().removeClass("active");
    $("#cityName").val('');
});

// Listens for search history list item to be clicked and reruns weather functions
$(document).on("click", "#searchHistory", function(){
    var savedCity = $(this).text();
    // This adds/removes active class so you can see which one was clicked/being displayed
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    currentWeather(savedCity);
    forecast(savedCity);
});

// Load any search history from localStorage
loadSearchHistory();