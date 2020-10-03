import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyle from './styles/global';

import AppProvider from './store/context';

const App = () => (
  <Router>
    <ToastContainer autoClose={4000} />

    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
