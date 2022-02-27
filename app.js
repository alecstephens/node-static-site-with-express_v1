const express = require('express');
const app = express();
const data = require('./data.json');
const {projects} = data;

//middleware
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//created routes
app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res, next) => {

});