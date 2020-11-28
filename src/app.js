const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')
const partialPath = path.join(__dirname, '../views/partials')

//Set up template engine (handlebars) and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Set up static dir path
app.use(express.static(publicPathDirectory))


const port = 8080

app.get('', (req, res) => {
   res.render('index', {
       title:'Weather',
       name:"Weather App"
   })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title:'ABOUT',
        aboutText:'This is the about us page',
        name:"Created by Razaq"
    })
});

app.get('/help', (req, res) => {
    res.json({
        message:"Help page",
        status:true,
        data:"This is a help page"
    });
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error:"You must provide a search term"
        })

    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            message: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude = 6.406, longitude=3.261, location}={}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                location:location,
                address:req.query.address,
                forecast:forecastData
            });
        })
    })
})


app.get('*', (req, res) => {
    res.send({
        'message': 'Not Found!'
    }).status(404);
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})