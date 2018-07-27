const express = require('express');

const app = express ();

app.use((req, res, next) => {
  console.log('First middleware');
  next(); // impt to call next if this middleware isn't sending a response
  //otherwise server will timeout bc its expecting a response
})

app.use((req, res, next) => {
  res.send('Hello from Express.js!');
});

module.exports = app;
