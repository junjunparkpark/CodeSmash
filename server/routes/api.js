'use strict';
const express = require('express');
const router = express.Router();
const Users = ('../index.js');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/api/:users')
  .get((req, res) => {
    res.status(200).send(Users.selectAll());
  })
  .post((req, res) => {
    // Temporary to refresh the database with every POST
    Users.collection.drop();
    console.log('POSTing to Users');
    Users.create(req.body, (err) => {
      if (err) { res.status(300).send('ERROR POSTING USER', err); } 
    });
    res.status(201).send({ data: 'POST to Users' });
  });

module.exports = router;
