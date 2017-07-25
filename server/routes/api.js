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
    console.log('POSTing to Users');
    res.status(201).send({ data: 'POST to Users' });
  });

module.exports = router;
