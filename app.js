const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(
      beersFromApi => res.render('beers', { beers: beersFromApi })
      // console.log('Beers from the database: ', beersFromApi)
    )
    .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));

app.get('/random-beer', (req, res) => {
  console.log(req.params);
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { beer: responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer:id', (req, res) => {
  // const id = req.params.toString().slice(1);
  // console.log(req.params[0]);
  // res.send(`<h1> ${req.params.id} </h1>`);
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(responseFromAPI => {
      res.render('beer', { beer: responseFromAPI });
    })
    .catch(error => console.log(error));
});

punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI);
    // res.render('random-beer', responseFromAPI);
  })
  .catch(error => console.log(error));

// punkAPI
//   .getBeers()
//   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//   .catch(error => console.log(error));
