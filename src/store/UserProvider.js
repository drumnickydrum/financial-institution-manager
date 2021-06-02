import { useStateAndCache } from 'hooks/useStateAndCache';
import { createContext } from 'react';

const INITIAL_STATE = {
  favorites: [],
  notes: {},
};

export const UserInputActions = createContext();
export const UserInput = createContext();
export const UserProvider = ({ children }) => {
  const [favorites, setFavorites] = useStateAndCache('favorites', INITIAL_STATE.favorites);
  const [notes, setNotes] = useStateAndCache('notes', INITIAL_STATE.notes);

  const addToFavorites = (ID) => {
    setFavorites((prev) => {
      const newFavs = [...prev, ID];
      return newFavs;
    });
  };

  const removeFromFavorites = (ID) => {
    setFavorites((prev) => {
      const newFavs = [...prev];
      newFavs.splice(newFavs.indexOf(ID), 1);
      return newFavs;
    });
  };

  const clearAllFavorites = () => setFavorites(INITIAL_STATE.favorites);

  return (
    <UserInputActions.Provider
      value={{ addToFavorites, removeFromFavorites, clearAllFavorites }}
    >
      <UserInput.Provider value={{ favorites, notes }}>{children}</UserInput.Provider>
    </UserInputActions.Provider>
  );
};
