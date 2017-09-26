const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log()
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

app.use((req, res, next) =>{
  res.render("maintenance.hbs");
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  res.render('Homepage.hbs', {
    pageTitle: 'Welcome to My First Web Project',
    name: 'Daniel',
    currentYear: new Date().getFullYear(),
    hobbies: [
      ' Software Programming',
      ' Neuroscience',
      ' and Piano.'
    ]
  });
});

app.get('/about', (req, res) =>{
  res.render("about.hbs", {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/po', (req, res) =>{
  res.send('Bad Request')
});
app.listen(5000, ()=>{
  console.log('Server is up on port 5000')
});
