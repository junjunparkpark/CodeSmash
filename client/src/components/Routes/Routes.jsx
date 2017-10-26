import React from 'react';
import { Router, Route, browserHistory, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import View from '../View.jsx';
import Home from '../Home/Home.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import Pricing from '../Pricing/Pricing.jsx';

const routes = [
  { path: '/',
    component: Home,
    exact: true
  },
  { path: '/in',
    component: View,
    routes: [
      { path: '/in/demo',
        component: View
      },
      { path: '/in/1',
        component: View
      }
    ]
  },
  { path: '/dashboard',
    component: Dashboard,
  },
  { path: '/pricing',
    component: Pricing,
  }
];

module.exports = (
  <BrowserRouter history={ browserHistory }>
    <Switch>
      <Route exact path={'/'} component={Home}></Route>
      <Route path={'/in'} component={View}></Route>
      <Route path={'/dashboard'} component={Dashboard}></Route>
      <Route path={'/pricing'} component={Pricing}></Route>
    </Switch>
  </BrowserRouter>
);