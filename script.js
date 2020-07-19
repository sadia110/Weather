const apiKey = "4d601727be6245f8779743289a400cc3";
 var currWeatherDiv = $("#currentWeather");
 var forecastDiv = $("#weatherForecast");

//  search fields----
 function writeSearchHistory(array) {
  $.each(array, function(i) {
      createHistoryButton(array[i]);
  })
}


$("#submitCity").click(function() {
  event.preventDefault();
  let cityName = $("#cityInput").val();
  returnCurrentWeather(cityName);
  returnWeatherForecast(cityName);
});

$("#previousSearch").click(function() {
  let cityName = event.target.value;
  returnCurrentWeather(cityName);
  returnWeatherForecast(cityName);
}) 

// Current Weather
function returnCurrentWeather(cityName) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

  $.get(queryURL).then(function(response){
      let currTime = new Date(response.dt*1000);
      let weatherIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

      currWeatherDiv.html(`
      <h2>${response.name}, ${response.sys.country} (${currTime.getMonth()+1}/${currTime.getDate()}/${currTime.getFullYear()})<img src=${weatherIcon} height="70px"></h2>
      <p>Temperature: ${response.main.temp} &#176;C</p>
      <p>Wind Speed: ${response.wind.speed} m/s</p>
      `, returnUVIndex(response.coord))
      createHistoryButton(response.name);
  })
};

// forcaste weather 
function returnWeatherForecast(cityName) {
  let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${apiKey}&units=metric`;

  $.get(queryURL).then(function(response){
      let forecastInfo = response.list;
      forecastDiv.empty();
      $.each(forecastInfo, function(i) {
          if (!forecastInfo[i].dt_txt.includes("12:00:00")) {
              return;
          }
          let forecastDate = new Date(forecastInfo[i].dt*1000);
          let weatherIcon = `https://openweathermap.org/img/wn/${forecastInfo[i].weather[0].icon}.png`;

          forecastDiv.append(`
          <div class="col-md">
              <div class="card text-white bg-primary">
                  <div class="card-body">
                      <h4>${forecastDate.getMonth()+1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                      <img src=${weatherIcon} alt="Icon">
                      <p>Temp: ${forecastInfo[i].main.temp} &#176;C</p>
                      <p>Humidity: ${forecastInfo[i].main.humidity}%</p>
                  </div>
              </div>
          </div>
          `)
      })
  })
};  

// UV INDEX *** 
function returnUVIndex(coordinates) {
  let queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${coordinates.lat}&lon=${coordinates.lon}&APPID=${apiKey}`;

  $.get(queryURL).then(function(response){
      let currUVIndex = response.value;
      let uvSeverity = "green";
      let textColour = "black"
      //Change UV background based on the level 
      if (currUVIndex >= 11) {
          uvSeverity = "blue";
      } else if (currUVIndex >= 8) {
          uvSeverity = "red";
      } else if (currUVIndex >= 6) {
          uvSeverity = "orange";
          textColour = "black"
      } else if (currUVIndex >= 3) {
          uvSeverity = "yellow";
          textColour = "black"
      }
      currWeatherDiv.append(`<p>UV Index: <span class="text-${textColour} uvPadding" style="background-color: ${uvSeverity};">${currUVIndex}</span></p>`);
  })
}

function createHistoryButton(cityName) {
  // TO CHECK IF BUTTON EXIT IN SEACH BOX 
  var citySearch = cityName.trim();
  var buttonCheck = $(`#previousSearch > BUTTON[value='${citySearch}']`);
  if (buttonCheck.length == 1) {
    return;
  }
  
  if (!citiesArray.includes(cityName)){
      citiesArray.push(cityName);
      localStorage.setItem("localWeatherSearches", JSON.stringify(citiesArray));
  }

  $("#previousSearch").prepend(`
  <button class="btn btn-light cityHistoryBtn" value='${cityName}'>${cityName}</button>
  `);
}

function writeSearchHistory(array) {
  $.each(array, function(i) {
      createHistoryButton(array[i]);
  })
}



$("#submitCity").click(function() {
  event.preventDefault();
  let cityName = $("#cityInput").val();
  returnCurrentWeather(cityName);
  returnWeatherForecast(cityName);
});

$("#previousSearch").click(function() {
  let cityName = event.target.value;
  returnCurrentWeather(cityName);
  returnWeatherForecast(cityName);
})



