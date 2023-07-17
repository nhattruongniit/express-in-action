const path = require('path');
const express = require('express');

const app = express();

// pug enigne
app.set('views', path.resolve(__dirname, "views"));
app.set('view engine', 'pug');

const entries = [
  {
    title: 'test',
    content: 'test content',
    published: new Date()
  },
];
app.locals.entries = entries; // make this entries array available in all views

// router
app.get('/', (_, res) => {
  res.render('index', {
    title: 'Guest Book',
    entries: entries
  });
});

app.get('/new-entry', (_, res) => {
  res.render('new-entry');
})

app.post('/new-entry', (req, res) => {
  if(!req.body.title || !req.body.body) {
    res.status(400).send('Entries must have a title and a body.');
    return;
  }

  entries.push({
    title: req.body.title,
    content: req.body.body,
    published: new Date()
  })
  res.redirect('/guest-book');
})

// render 404 page because no route matched
app.use((_, res) => {
  res.status(404).render('404');
})

module.exports = app;