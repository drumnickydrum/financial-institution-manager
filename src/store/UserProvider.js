import { useStateAndCache } from 'hooks/useStateAndCache';
import { createContext } from 'react';

const Favorites = Object.prototype.constructor;
const Notes = Object.prototype.constructor;

export const UserInputActions = createContext();
export const UserInput = createContext();
export const UserProvider = ({ children }) => {
  const [favorites, setFavorites] = useStateAndCache('favorites', new Favorites());
  const [notes, setNotes] = useStateAndCache('notes', new Notes());

  const addToFavorites = (item) => {
    setFavorites((prev) => {
      const newFavs = { ...prev, [item.ID]: item };
      return newFavs;
    });
  };

  const removeFromFavorites = (ID) => {
    setFavorites((prev) => {
      const newFavs = { ...prev };
      delete newFavs[ID];
      return newFavs;
    });
  };

  const clearAllFavorites = () => setFavorites(new Favorites());

  const editNotes = (ID, note) => {
    setNotes((prev) => {
      const newNotes = { ...prev };
      newNotes[ID] = note;
      return newNotes;
    });
  };

  return (
    <UserInputActions.Provider
      value={{ addToFavorites, removeFromFavorites, clearAllFavorites, editNotes }}
    >
      <UserInput.Provider value={{ favorites, notes }}>{children}</UserInput.Provider>
    </UserInputActions.Provider>
  );
};
