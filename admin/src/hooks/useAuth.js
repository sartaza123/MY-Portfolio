import { useState, useCallback } from 'react';
import { authStore } from '../store/authStore';

export const useAuth = () => {
  const [user, setUser] = useState(() => authStore.getUser());

  const login = useCallback((token, userData) => {
    authStore.login(token, userData);
    setUser(authStore.getUser());
  }, []);

  const logout = useCallback(() => {
    authStore.logout();
    setUser(null);
  }, []);

  const updateUser = useCallback((data) => {
    authStore.updateUser(data);
    setUser(authStore.getUser());
  }, []);

  return {
    isAuthenticated: authStore.isAuthenticated(),
    user,
    login,
    logout,
    updateUser,
  };
};
