const apiKey = '4f93d28157da5d627096c63d35534631';
const inputCidadeVar = document.getElementById("inputCidade").value
const urlWeather = `http://api.openweathermap.org/data/2.5/weather?q=${inputCidadeVar}&appid=${apiKey}`;
const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
async function fetchWeather(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
      // Loop through the forecast list
      data.list.forEach(forecast => {
        // Extract date and weather description
        const date = forecast.dt_txt;
        const weatherDescription = forecast.weather[0].description;
        console.log(`Date: ${date}, Weather description: ${weatherDescription}`);
      });
    })
    .catch(error => console.error('Error fetching the weather data:', error));
}