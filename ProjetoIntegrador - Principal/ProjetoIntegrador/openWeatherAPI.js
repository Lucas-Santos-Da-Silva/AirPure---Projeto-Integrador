const apiKeyWeather = '4f93d28157da5d627096c63d35534631'
const weatherContainer = document.getElementById("monitorMain")
const forecastContainer = document.getElementById("3DayBeforeDay")
const city = document.getElementById("city")
const error = document.getElementById("error")


const units = "metric"
let temperatureSymbol = units == 'imperial' ? "ºF" : "ºC"

async function fetchWeather(){
    try{
        weatherContainer.innerHTML =''
        error.innerHTML = ''
        city.innerHTML = ''

        const cnt = 1
        const inputCidadeVar = document.getElementById("inputCidade").value
        
        
        const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCidadeVar}&appid=${apiKeyWeather}&units=${units}&cnt=${cnt}`
        const apiUrlWeather = `http://api.openweathermap.org/data/2.5/weather?q=${inputCidadeVar}&appid=${apiKeyWeather}`

        const forecastResponse = await fetch(apiUrlForecast)
        const forecastData = await forecastResponse.json()

        const WeatherResponse = await fetch(apiUrlWeather)
        const Weatherdata = await WeatherResponse.json()
        console.log(27, Weatherdata, "Weather data")
        console.log(27, forecastData, "Forecast data")

        //Display error user types invalid city or no city
        if (forecastData.cod == '400' || forecastData.cod == '404'){
            error.innerHTML = 'Not valid city. Please input another city'
            return
        }
        //Display error user types invalid city or no city
        if (Weatherdata.cod == '400' || Weatherdata.cod == '404'){
            error.innerHTML = 'Not valid city. Please input another city'
            return
        }
        //Display wheater data for each 3 hour increment
        forecastData.list.forEach(hourlyForecastData =>{
            const hourlyWeatherDataDiv = createWeatherDescription(hourlyForecastData)
            forecastContainer.appendChild(hourlyForecastDataDiv)
        })
        Weatherdata.list.forEach(hourlyWeatherData =>{
            const hourlyWeatherDataDiv = createWeatherDescription(hourlyWeatherData)
            weatherContainer.appendChild(hourlyWeatherDataDiv)
        })
        //Displayer city name based on latitude and longitude
        city.innerHTML = `Informações do clima para ${data.city.name}`

        
    }
    catch (error){
        console.log(error)
    }
}

function convertToLocalTime(dt){
    const date = new Date(dt * 1000)
    console.log(dt, "dt")
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') //Mounths are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours() %12 || 12).padStart(2, '0') // Convert 24-hour to 12-hour format
    const minutes = String(date.getMinutes(1)).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const period = date.getHours() <= 12 ? 'PM' : 'AM' //Determine AM/PM
    
    return `${day}-${month}-${year}-${hours}:${minutes}:${seconds} ${period}`
}
function createWeatherDescription(weatherData, forecastData){
    const {main, dt} = forecastData
    
    console.log({main, dt}," {main, dt}")
    const description = document.createElement("div")
    const convertedDataAndTime = convertToLocalTime(dt)
    const weatherDescription = weatherData['weather'][0]['description']
    console.log(convertedDataAndTime, "converted data and time")
    

    description.innerHTML = `<div class = "weather_description"> ${main.temp}${temperatureSymbol} - ${convertedDataAndTime.substring(0, 10)} ${convertedDataAndTime.substring(12, 24)}, feels like ${main.feels_like}, description ${weatherDescription}</div>`
    

    return description
}