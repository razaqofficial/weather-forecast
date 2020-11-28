const request = require('request');

const forecast = async (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=14315d45b04619232335629ec5807858&query=${latitude},${longitude}&units=f`
    await request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('unable to find location, try another place', undefined)
        } else {
            callback(undefined, body)
        }
    });
}

module.exports = forecast