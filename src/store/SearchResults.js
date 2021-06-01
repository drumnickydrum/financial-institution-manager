import { PATHS } from 'App';
import { createContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getLS, useStateAndLS } from 'utils/storage';

const INITIAL_STATE = {
  zipSearched: getLS('zipSearched') || '',
  nearbyZips: getLS('nearbyZips') || [],
  fdic: getLS('fdic') || [],
};

export const SetSearchResults = createContext();
export const SearchResults = createContext();
export const SearchResultsProvider = ({ children }) => {
  const history = useHistory();
  const [searchResults, setSearchResults] = useStateAndLS('searchResults', INITIAL_STATE);

  // update state before forwarding to results page, then reset flag
  useEffect(() => {
    if (searchResults.fwd) {
      history.push(PATHS.RESULTS);
      setSearchResults((prev) => ({ ...prev, fwd: false }));
    }
  }, [history, searchResults.fwd, setSearchResults]);

  return (
    <SetSearchResults.Provider value={setSearchResults}>
      <SearchResults.Provider value={searchResults}>{children}</SearchResults.Provider>
    </SetSearchResults.Provider>
  );
};
