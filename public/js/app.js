const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('.msg1');
const msgTwo = document.querySelector('.msg2');

console.log('Javascript on the client side');

msgOne.textContent = '';
msgTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  msgOne.textContent = '';
  msgTwo.textContent = 'Loading..';
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {

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





// alert('Client side Javascript is loaded!');

/*
Goal: fetch weather

1. Setup a call to fetch to fetch weather for Boston
2. Get the parse JSON response
  - if error property print error.
  - if no error property print location and forecast.
3. Refresh the browser and test your work.

*/