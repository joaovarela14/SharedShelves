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
      const newList = [...(prevLists[listName] || []), bookId];
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
  // Função para adicionar um livro à wishlist
  const addToWishlist = (bookId) => {
    // Verifica se o ID do livro já está na lista para evitar duplicatas
    if (!wishlist.includes(bookId)) {
      setWishlist([...wishlist, bookId]);
    }
  };
  const removeFromWishlist = (bookId) => {
  const updatedWishlist = wishlist.filter(id => id !== bookId);
  setWishlist(updatedWishlist); // Atualiza a wishlist com a nova lista filtrada
  };

  
  return (
    <GlobalStateContext.Provider
      value={{
        selectedBookIndex,
        setSelectedBookIndex,
        totalPoints,
        setTotalPoints,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        lists,
        addBookToList,
        createList,
        removeList,
        toggleListPrivacy
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);