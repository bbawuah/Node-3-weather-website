const request = require('request');

const geoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmF3dWFoYjAwMSIsImEiOiJjanhjNnNydXkwMGJ1M3Bsb295N3JyandhIn0.FevIyeyQX3bhTpWGr0KJfw&limit=1';

  request({url, json: true }, (error, { body }, { features }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[0],
        longitude: features[0].center[1],
        location: features[0].place_name
      });
    }
  });

};


module.exports = geoCode;