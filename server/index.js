'use strict';
const app = require('./app');
const db = require('../db');
const port = process.env.PORT || '3000';

app.listen(port || 3000, () => {
  console.log(`NSA listening on port`, port);
});
