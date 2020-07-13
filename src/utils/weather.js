const fetch = require('node-fetch')

const weather_longlat = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=e26950517a880467a0cdfc622676e0f8&units=metric"
    fetch(url).then(res => res.json()).then(data => {
        const forecast = data.weather[0].main + ' ('
            + data.weather[0].description + '), with temperature '
            + data.main.temp + ' Celcius, Humidity '
            + data.main.humidity + '% and Wind speed about '
            + data.wind.speed + ' meter/sec.'
        callback(undefined, {
            forecast,
            icon: data.weather[0].icon,
            location: data.name
        })
    }).catch(err => {
        callback('Unable to connect to weather services!', undefined)
    })
}

const weather_cityName = (cityName, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=e26950517a880467a0cdfc622676e0f8"
    fetch(url).then(res => res.json()).then(data => {
        callback(undefined, {
            main: data.weather[0].main,
            description: data.weather[0].description,
            temp: data.main.temp,
            humidity: data.main.humidity,
            windspeed: data.wind.speed,
            location: data.name
        })
    }).catch(err => {
        callback('Unable to connect to weather services!', undefined)
    })
}

module.exports = {
    weather_longlat: weather_longlat,
    weather_cityName: weather_cityName
}