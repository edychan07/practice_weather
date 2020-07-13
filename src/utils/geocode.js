const fetch = require('node-fetch')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZWR5Y2hhbiIsImEiOiJja2M0cGRsa3kwYTNmMnJvOWR4cXZtaWdpIn0.fL2ZNDwrCv86gYPk11-Npg'
    fetch(url).then(res => res.json()).then(({features}) => {
        if (features.lenght === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    }).catch(err => {
        callback('Unable to connect to location services!', undefined)
    })
}

module.exports = geocode