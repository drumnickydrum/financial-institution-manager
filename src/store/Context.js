import { createContext } from 'react';
import { getLS, useStateAndLS } from 'utils/storage';

const INITIAL_STATE = {
  favorites: getLS('favorites') || [],
  notes: getLS('notes') || {},
};

export const SetContext = createContext();
export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useStateAndLS('favorites', INITIAL_STATE.favorites);
  const [notes, setNotes] = useStateAndLS('notes', INITIAL_STATE.notes);

  return (
    <SetContext.Provider value={{ setFavorites, setNotes }}>
      <Context.Provider value={{ favorites, notes }}>{children}</Context.Provider>
    </SetContext.Provider>
  );
};
