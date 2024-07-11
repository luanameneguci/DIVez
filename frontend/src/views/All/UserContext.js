import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: localStorage.getItem('idUser'),
    userRole: localStorage.getItem('userRole')
  });

  const updateUser = (userId, userRole) => {
    setUser({ userId, userRole });
    localStorage.setItem('idUser', userId);
    localStorage.setItem('userRole', userRole);
  };

  const logoutUser = () => {
    setUser({
      userId: null,
      userRole: null
    });
    localStorage.removeItem('idUser');
    localStorage.removeItem('userRole');
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
