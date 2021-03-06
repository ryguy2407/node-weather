const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/6a0f967e35db9f2625c5e75f1e0c472f/'+latitude+','+longitude+'?units=si'
	request({
		url,
		json: true
	}, (error, { body }) => {
		if (error) {
			callback("couldn't connect to forecast service", undefined)
		} else if(body.error) {
			callback(body.error, undefined)
		} else {
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out, there is a ' + body.currently.precipProbability + '% chance of rain. High of ' + body.daily.data[0].temperatureHigh + ' degrees, low of ' + body.daily.data[0].temperatureLow + ' degrees')
		}
	})
}

module.exports = forecast
