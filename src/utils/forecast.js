const request = require('request');

const foreCast = (x, y, callback) => {

  const url = `https://api.darksky.net/forecast/9af6f6103ac20493bc8d308d22e44b0a/${x},${y}?units=si&lang=en`;

  request({url, json: true }, (error, {body}) => {
    // console.log(response.body.currently);

    const summary = body.daily.data[0].summary;
    const temperatureLow = body.daily.data[0].temperatureMin;
    const temperatureHigh = body.daily.data[0].temperatureMax;
    const temperature = body.currently.temperature;
    const precipProbability = body.currently.precipProbability;

    if (error) {
      callback('Unable to connect to location services!', undefined);      
    } else if (body.error) {
      callback('Unable to find location. Try another search', undefined);      
    } else {

      callback(undefined, `${summary} Currently, it is ${temperature} degrees Celsius. The minimum temperature of today is ${temperatureLow} degrees Celsius. The maximum temperature of the day is ${temperatureHigh} degrees Celsius. There is ${precipProbability}% chance of rain.`);


    }
  });
};


module.exports = foreCast;