import React, { createContext, useState, useContext } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [wishlist, setWishlist] = useState([]); // Adicionando a wishlist
  const [lists, setLists] = useState({
    Wishlist: { items: [], isPrivate: false }
});

const addBookToList = (listName, bookId) => {
  setLists(prevLists => {
    const newList = prevLists[listName]
      ? { ...prevLists[listName], items: [...prevLists[listName].items, bookId] }
      : { items: [bookId], isPrivate: false };
    return { ...prevLists, [listName]: newList };
  });
};

  const removeList = (listName) => {
    setLists(prevLists => {
      const updatedLists = { ...prevLists };
      delete updatedLists[listName];
      return updatedLists;
    });
  };

const createList = (listName) => {
    setLists(prevLists => {
        if (!prevLists[listName]) {
            return { ...prevLists, [listName]: { items: [], isPrivate: false } };
        }
        return prevLists;
    });
};

const toggleListPrivacy = (listName) => {
    setLists(prevLists => {
        if (prevLists[listName]) {
            const isPrivate = prevLists[listName].isPrivate;
            return {
                ...prevLists,
                [listName]: { ...prevLists[listName], isPrivate: !isPrivate }
            };
        }
        return prevLists;
    });
};
  const removeBookFromList = (listName, bookId) => {
    setLists(prevLists => {
      const newList = (prevLists[listName]?.items || []).filter(id => id !== bookId);
      return {
        ...prevLists,
        [listName]: {
          ...prevLists[listName],
          items: newList
        }
      };
    });
  };
  const bookCover = {
    'acriada': require('../../assets/acriada.jpeg'),
    'harrypotterbook': require('../../assets/harrypotterbook.jpg'),
    'portatrancada': require('../../assets/portatrancada.jpeg'),
    'stephenking': require('../../assets/stephenking.jpg'),
    'behindthenet': require('../../assets/behindthenet.jpg'),
    '1984': require('../../assets/1984.jpg'),
    'itendswithus': require('../../assets/itendswithus.jpg'),
    'thehousemaidsecret': require('../../assets/thehousemaidsecret.jpg'),
    'thehousemaidiswatching': require('../../assets/thehousemaidiswatching.jpeg'),
    'theex': require('../../assets/theexit.jpg'),
    'prideprejudicecover': require ('../../assets/prideprejudice.jpeg'),
  };

  
  return (
    <GlobalStateContext.Provider
      value={{
        selectedBookIndex,
        setSelectedBookIndex,
        totalPoints,
        setTotalPoints,
        wishlist,
        lists,
        addBookToList,
        removeBookFromList,
        createList,
        removeList,
        toggleListPrivacy,
        bookCover,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);