
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const geoCodeReverse = require('./utils/geocodeReverse');
const foreCast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setuo static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {

  res.render('index', {
    title: 'Weather app',
    name: 'Brian Bawuah'
  });
});



app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Brian Bawuah'
  });
});



app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'How can I help you?.',
    name: 'Brian Bawuah'
  });
});

app.get('/location', (req, res) => {

  geoCodeReverse(req.query.lng, req.query.lat, (error, data) => {
    if (error) {
      res.send({ error });
    }

    foreCast(req.query.lat, req.query.lng, (error, forecastData) => {
      if (error) {
        res.send({ error });
      }
      res.send({
        city: data.location,
        forecast: forecastData
      });
    });
  });

});

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address..'
    });
  }

  geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      console.log('Something went wrong');
      return res.send({ error });
    }

    foreCast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});


app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Help',
    message: 'Help article not found',
    name: 'Brian Bawuah'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Weather app',
    message: '404 page',
    name: 'Brian Bawuah'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}.`);
});
