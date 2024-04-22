import React, { createContext, useState, useContext } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  return (
    <GlobalStateContext.Provider value={{ selectedBookIndex, setSelectedBookIndex }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);