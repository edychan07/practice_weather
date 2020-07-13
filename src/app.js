const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// define paths for Express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Edy Chan'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Edy Chan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Edy Chan',
        helpmsg: '"Part of being a person is about helping others."'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'An address should be provided.'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        weather.weather_longlat(latitude, longitude, (error, {forecast, icon}) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast,
                location,
                icon,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404page',{
        title: '404',
        name: 'Edy Chan',
        errormsg: 'Help article not found.'
    })
})

app.get('*',(req,res) => {
    res.render('404page', {
        title: '404',
        name: 'Edy Chan',
        errormsg: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000.')
})