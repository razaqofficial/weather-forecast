const request = require('request');

const geocode = async (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmF6YXFvZmZpY2lhbCIsImEiOiJja2hqYTlmZmcxOTY5MnJtY2ViMnFlczlsIn0.wVK0647pwnNKVtlSwyyYgA`;

    await request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location, try another place', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode