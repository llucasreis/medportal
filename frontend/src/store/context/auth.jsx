import React, { createContext, useCallback, useState, useContext } from 'react';

import { api, apiRoutes } from '../../services/api';

export const AuthContext = createContext({});

export const getToken = () => {
  return localStorage.getItem('@medportal:token');
};

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@medportal:token');
    const user = localStorage.getItem('@medportal:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const { data: responseData } = await api.post(apiRoutes.SESSION, {
        email,
        password,
      });
      const { user, token } = responseData.content;

      localStorage.setItem('@medportal:token', token);
      localStorage.setItem('@medportal:user', JSON.stringify(user));

      setData({ user, token });

      return { data: responseData, success: true };
    } catch (error) {
      let responseData = null;

      if ('response' in error) {
        responseData = error.response.data;
      }

      return { data: responseData, success: false };
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@medportal:token');
    localStorage.removeItem('@medportal:user');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
