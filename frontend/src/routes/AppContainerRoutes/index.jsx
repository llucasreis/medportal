import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Route from '../Route';

import Home from '../../pages/Home';
import Doctor from '../../pages/Doctor';

const AppContainerRoutes = () => {
  const { path } = useRouteMatch();
  console.log(path);

  return (
    <>
      <Route path={`${path}/home`} component={Home} isPrivate />
      <Route path={`${path}/doctor`} component={Doctor} isPrivate />
    </>
  );
};

export default AppContainerRoutes;
