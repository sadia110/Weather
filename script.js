const apiKey = "4d601727be6245f8779743289a400cc3";
 var currWeatherDiv = $("#currentWeather");
 var forecastDiv = $("#weatherForecast");

  function returnCurrentWeather(cityName) {
     let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`; 

     $.get(queryURL).then(function(response){
      console.log(response);
      let unixTime = new Date();

       currWeatherDiv.html(`
      <h2>${response.name} (${unixTime.getMonth()}/${unixTime.getDate()}/${unixTime.getFullYear()})</h2>
      <p>Temperature: ${(response.main.temp - 273.15).toFixed(1)} &#176;C</p>
      <p>Humidity: ${response.main.humidity}%</p>
      <p>Wind Speed: ${response.wind.speed} m/s</p>
      `)
  })
};

function returnWeatherForecast(cityName) {
  let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${apiKey}`;


      $.get(queryURL).then(function(response){
         console.log(response);
         currWeatherDiv.html(`
         <h2>${response.name}</h2>
         <p>Temperature: ${(response.main.temp - 273.15).toFixed(1)} &#176;C</p>
         <p>Humidity: ${response.main.humidity}%</p>
         <p>Wind Speed: ${response.wind.speed} m/s</p>
         `)
     })
 };