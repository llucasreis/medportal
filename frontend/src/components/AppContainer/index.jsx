import React from 'react';

import AppContainerRoutes from '../../routes/AppContainerRoutes';
import SideBar from './SideBar';

const AppContainer = () => {
  return (
    <SideBar>
      {console.log('entrou')}
      <AppContainerRoutes />
    </SideBar>
  );
};

export default AppContainer;
