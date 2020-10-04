import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import AppContainer from '../components/AppContainer';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/admin" component={AppContainer} isPrivate />

    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
