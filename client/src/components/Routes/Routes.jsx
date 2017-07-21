import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import View from '../view.js';

module.exports = (
  <BrowserRouter history={ browserHistory }>
    <Route path={'/'} component={View}></Route>
  </BrowserRouter>
);