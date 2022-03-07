const express = require('express');
const app = express();
const data = require('./data.json');
const { projects } = data;

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
    const {id} = req.params;
    const project = projects[id];

    if(project) {
        res.render('project', project);
    } else {
        next();
    }
});

//listener
app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});

//error handlers
app.use((req, res, next) => {
    const err = new Error();
    err.message = 'Page Not Found';
    err.status = 404;
    next(err);
});

app.use((req, res, next) => {
    if(err.status === 404) {
        res.status(404).render('not-found', err);
    } else {
        err.message = err.message || 'It looks like something went wrong with the server!';
        res.status(err.status || 500);
        res.render('error', err);
    }
});