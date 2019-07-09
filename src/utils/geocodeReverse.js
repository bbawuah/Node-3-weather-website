const request = require('request');

const geoCodeReverse = (longitude, latitude, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYmF3dWFoYjAwMSIsImEiOiJjanhjNnNydXkwMGJ1M3Bsb295N3JyandhIn0.FevIyeyQX3bhTpWGr0KJfw&limit=1`;

  request({ url: url, json: true }, (error, body) => {
    if (error) {
      // callback('Unable to find your current location', undefined);

      console.log('Unable to find current location');
    } else {
      callback(undefined, {

        location: body.body.features[0].place_name,
        longitude: body.body.features[0].center[0],
        latitude: body.body.features[0].center[1]
       
      });
     


    }
  });
};

module.exports = geoCodeReverse;