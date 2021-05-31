import { createContext } from 'react';
import { getLS, useStateAndLS } from 'utils/storage';

const INITIAL_STATE = {
  zip: getLS('zip') || '',
  favorites: getLS('favorites') || [],
  notes: getLS('notes') || {},
  results: getLS('results') || {},
  nearby: getLS('nearby') || [],
};

export const SetContext = createContext();
export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [zip, setZip] = useStateAndLS('zip', INITIAL_STATE.zip);
  const [nearby, setNearby] = useStateAndLS('nearby', INITIAL_STATE.nearby);
  const [results, setResults] = useStateAndLS('results', INITIAL_STATE.results);
  const [favorites, setFavorites] = useStateAndLS('favorites', INITIAL_STATE.favorites);
  const [notes, setNotes] = useStateAndLS('notes', INITIAL_STATE.notes);

  return (
    <SetContext.Provider value={{ setZip, setNearby, setResults, setFavorites, setNotes }}>
      <Context.Provider value={{ zip, nearby, results, favorites, notes }}>
        {children}
      </Context.Provider>
    </SetContext.Provider>
  );
};
