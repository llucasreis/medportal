import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/home" component={Home} isPrivate />

    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
