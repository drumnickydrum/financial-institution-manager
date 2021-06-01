import { PATHS } from 'App';
import { useIsInitial } from 'hooks/useIsInitial';
import { createContext, useEffect, useState } from 'react';
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
  const [fwd, setFwd] = useState(false);

  const isInitial = useIsInitial();
  useEffect(() => {
    if (isInitial) return;
    else setFwd(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults]);

  useEffect(() => {
    if (fwd) {
      history.push(PATHS.RESULTS);
      setFwd(false);
    }
  }, [fwd, history, searchResults]);

  return (
    <SetSearchResults.Provider value={setSearchResults}>
      <SearchResults.Provider value={searchResults}>{children}</SearchResults.Provider>
    </SetSearchResults.Provider>
  );
};
