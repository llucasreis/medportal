import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Route from '../Route';

import Home from '../../pages/Home';
import Doctor from '../../pages/Doctor';
import Appointment from '../../pages/Appointment';

const AppContainerRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Route path={`${path}/home`} component={Home} isPrivate />
      <Route path={`${path}/doctor`} component={Doctor} isPrivate />
      <Route path={`${path}/appointment`} component={Appointment} isPrivate />
    </>
  );
};

export default AppContainerRoutes;
