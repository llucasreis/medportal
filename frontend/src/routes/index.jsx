import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
  </Switch>
);

export default Routes;
