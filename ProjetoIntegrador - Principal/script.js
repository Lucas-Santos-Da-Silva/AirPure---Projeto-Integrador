const apiKey = '4f93d28157da5d627096c63d35534631'
const weatherContainer = document.getElementById("weather")
const city = document.getElementById("city")
const error = document.getElementById("error")

const units = "metric"
let temperatureSymbol = units == 'imperial' ? "ºF" : "ºC"

async function fetchWeather(){
    try{
        weatherContainer.innerHTML =''
        error.innerHTML = ''
        city.innerHTML = ''

        const cnt = 10
        const inputCidadeVar = document.getElementById("inputCidade").value
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCidadeVar}&appid=${apiKey}&units=${units}&cnt=${cnt}`

        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(27, data)

        //Display error user types invalid city or no city
        if (data.cod == '400' || data.cod == '404'){
            error.innerHTML = 'Not valid city. Please input another city'
            return
        }
        //Display wheater data for each 3 hour increment
        data.list.forEach(hourlyWeatherData =>{
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

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') //Mounths are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours() %12 || 12).padStart(2, '0') // Convert 24-hour to 12-hour format
    const minutes = String(date.getMinutes(1)).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const period = date.getHours() <= 12 ? 'PM' : 'AM' //Determine AM/PM
    
    return `${year}-${month}-${day}-${hours}:${minutes}:${seconds} ${period}`
}
function createWeatherDescription(weatherData){
    const {main, dt} = weatherData
    const description = document.createElement("div")
    const convertedDataAndTime = convertToLocalTime(dt)

    description.innerHTML = `<div class = "weather_description"> ${main.temp}${temperatureSymbol} - ${convertedDataAndTime.substring(10)} - ${convertedDataAndTime.substring(5, 10)} </div>`
    return description
}