const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for express config
const publicDirecotryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirecotryPath))

// Routes
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Ryan'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Ryan'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'Here is some help',
		name: 'Ryan'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address) {
		return res.send({
			error: 'Address must be provided'
		})
	}
	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if(error) {
			return res.send({ error })
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if(error) {
				return res.send({ error })
			}
			return res.send({
				title: 'Forecast',
				forecast: forecastData,
				location: location
			})
		})
	})
})

app.get('/products', (req, res) => {
	if(!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}
	console.log(req.query)
	res.send({
		products:[]
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Whoops 404',
		error: 'Help article not found',
		name: 'Ryan'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Whoops 404',
		error: 'Page not found',
		name: 'Ryan'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})
