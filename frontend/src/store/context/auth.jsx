import React, { createContext, useCallback, useState, useContext } from 'react';

import { api, apiRoutes } from '../../services/api';

export const AuthContext = createContext({});

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
    const { data: responseData } = await api.post(apiRoutes.SESSION, {
      email,
      password,
    });

    if (responseData.errors.length === 0) {
      const { user, token } = responseData;

      localStorage.setItem('@medportal:token', token);
      localStorage.setItem('@medportal:user', JSON.stringify(user));

      setData({ user, token });

      return { responseData, success: true };
    }
    return { responseData, success: false };
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
