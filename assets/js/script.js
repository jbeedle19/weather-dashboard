// Variables:
var searchInput = "Philadelphia"
var apiURLCurrent =  "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial&appid=f6fb688c99006ae63bed987a2574a6d4"
var apiURLForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&units=imperial&appid=f6fb688c99006ae63bed987a2574a6d4"
var currentDate = moment().format("M/D/YYYY") 

// Functions:
function currentWeather() {
    fetch(apiURLCurrent)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        var cityDateIcon = response.name + " (" + currentDate + ") " + response.weather[0].icon;
            $("#cityDateIcon").append(cityDateIcon);
        var currentTemp = response.main.temp + "°F";
            $("#currentTemp").append(currentTemp);
        var currentHMD = response.main.humidity + "%";
            $("#currentHMD").append(currentHMD);
        var windSpeed = response.wind.speed + " MPH";
            $("#windSpeed").append(windSpeed);
        //console.log("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=f6fb688c99006ae63bed987a2574a6d4")
        fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=f6fb688c99006ae63bed987a2574a6d4")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var uvIndex = response.value
            if (uvIndex < 3) {
                $("#uvIndex")
                .addClass("favorable")
                //.append(uvIndex);
            } else if (uvIndex < 7) {
                $("#uvIndex")
                .removeClass()
                .addClass("moderate")
                //.append(uvIndex);  
            } else if (uvIndex >= 7) {
                $("#uvIndex")
                .removeClass()
                .addClass("severe")
                //.append(uvIndex)
            }  
            $("#uvIndex").append(uvIndex) 
            // JUST FINISHED THIS, WORK ON DISPLAYING DATA BASED ON USER INPUT
        });
    })
}

function forecast() {
    fetch(apiURLForecast)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        var forecastDate = moment(response.list[1].dt_txt).format("M/D/YYYY");
        console.log(forecastDate);
        var forecastIcon = response.list[1].weather[0].icon;
        console.log(forecastIcon);
        var forecastTemp = "TEMP: "+ response.list[1].main.temp + "°F";
        console.log(forecastTemp);
        var forecastHMD = "HMD: " + response.list[1].main.humidity + "%";
        console.log(forecastHMD);
        var forecastHTML = '<div class="card text-white bg-primary p-2">' +
                            '<p class="card-title h5">' + forecastDate + '</p>' +
                            '<p class="card-text">' + forecastIcon + '</p>' +
                            '<p class="card-text">' + forecastTemp + '</p>' +
                            '<p class="card-text">' + forecastHMD + '</p>' +
                           '</div>';
        $(".card-deck").append(forecastHTML);
    });
}
forecast();

function searchHistory() {
    // Function to save the things being typed into the search field and also display them in a list underneath
}

// Event Listeners:
$("#citySearchForm").on("submit", function(event) {
    event.preventDefault();
    currentWeather();
    });