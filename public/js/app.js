const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('.msg1');
const msgTwo = document.querySelector('.msg2');
const currentLocBtn = document.querySelector('#current-loc');

console.log('Javascript on the client side');




msgOne.textContent = '';
msgTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  msgOne.textContent = '';
  msgTwo.textContent = 'Loading..';
  fetch(`/weather?address=${location}`).then((response) => {

    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
        msgTwo.textContent = '';
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });

  });

});

currentLocBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;

      msgOne.textContent = '';
      msgTwo.textContent = 'Loading..';

      fetch(`/location?lng=${longitude}&lat=${latitude}`).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            msgOne.textContent = data.error;
            msgTwo.textContent = '';
          }

          else {
            msgOne.textContent = data.city;
            msgTwo.textContent = data.forecast;
          }
        });
      });
    });
  }
});



// alert('Client side Javascript is loaded!');

/*
Goal: fetch weather

1. Setup a call to fetch to fetch weather for Boston
2. Get the parse JSON response
  - if error property print error.
  - if no error property print location and forecast.
3. Refresh the browser and test your work.

*/