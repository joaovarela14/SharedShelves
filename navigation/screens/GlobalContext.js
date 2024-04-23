import React, { createContext, useState, useContext } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);


  return (
    <GlobalStateContext.Provider
      value={{
        selectedBookIndex,
        setSelectedBookIndex,
        totalPoints,
        setTotalPoints,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);