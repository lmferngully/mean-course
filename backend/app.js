const express = require('express');

const app = express ();

// app.use((req, res, next) => {
//   console.log('First middleware');
//   next(); // impt to call next if this middleware isn't sending a response
//   //otherwise server will timeout bc its expecting a response
// })

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'trqreredfd', title: 'First server side post', content: ' This is coming form the server'},
    { id: 'grestriotr', title: 'Second server side post', content: ' This is coming form the server too'},
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts
  });
});

module.exports = app;
