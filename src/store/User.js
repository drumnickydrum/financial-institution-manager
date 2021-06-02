import { useStateAndCache } from 'hooks/useStateAndCache';
import { createContext } from 'react';
import { getCachedState } from 'utils/storage';

const INITIAL_STATE = {
  favorites: getCachedState('favorites') || [],
  notes: getCachedState('notes') || {},
};

export const SetUser = createContext();
export const User = createContext();
export const UserProvider = ({ children }) => {
  const [favorites, setFavorites] = useStateAndCache('favorites', INITIAL_STATE.favorites);
  const [notes, setNotes] = useStateAndCache('notes', INITIAL_STATE.notes);

  return (
    <SetUser.Provider value={{ setFavorites, setNotes }}>
      <User.Provider value={{ favorites, notes }}>{children}</User.Provider>
    </SetUser.Provider>
  );
};
