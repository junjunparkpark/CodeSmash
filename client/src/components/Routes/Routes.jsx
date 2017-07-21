import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import View from '../view.js';

module.exports = (
  <BrowserRouter history={ hashHistory }>
    <Route path={'/'} component={View}></Route>
  </BrowserRouter>
);