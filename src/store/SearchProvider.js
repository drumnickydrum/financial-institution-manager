import { PATHS } from 'App';
import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useStateAndCache } from 'hooks/useStateAndCache';
import { searchByZip, searchByZipMultiple } from './functions/searchByZip';

class Results {
  constructor(zipSearched = '') {
    this.zipSearched = zipSearched;
    this.nearbyZips = [];
    this.fiList = [];
  }
}

let fwdToPath = '';

export const SearchActions = createContext();
export const SearchState = createContext();
export const SearchResults = createContext();

export const SearchProvider = ({ children }) => {
  const history = useHistory();

  const [results, setResults] = useStateAndCache('results', new Results());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fwdToPath) return;
    history.push(fwdToPath);
    fwdToPath = '';
  }, [history, results]);

  const search = async (zipInput) => {
    setLoading(true);
    const newResults = new Results(zipInput);
    const data = await searchByZip(zipInput);
    if (data.errors.zip) setError(data.errors.zip);
    else if (data.errors.fdic) setError(data.errors.fdic);
    else {
      newResults.nearbyZips = data.results.zip;
      newResults.fiList = data.results.fdic;
    }
    if (newResults.fiList.length > 0) fwdToPath = PATHS.RESULTS;
    setResults(newResults);
    setLoading(false);
  };

  const searchNearby = async () => {
    setLoading(true);
    const zips = results.nearbyZips.slice(0, 10);
    const newResults = new Results(zips.join());
    const data = await searchByZipMultiple(zips);
    if (data.error?.match(/rejected/)) setError(data.error);
    else {
      fwdToPath = PATHS.RESULTS;
      newResults.fiList = data.results;
    }
    setResults(newResults);
    setLoading(false);
  };

  const searchNearbyAndAddToResults = async () => {
    setLoading(true);
    const zips = results.nearbyZips.slice(0, 10);
    const data = await searchByZipMultiple(zips);
    if (data.error) setError(data.error);
    else {
      setResults((prev) => {
        const newFiList = [...prev.fiList];
        newFiList.push(...data.results);
        return { ...prev, nearbyZips: [], fiList: newFiList };
      });
    }
    setLoading(false);
  };

  return (
    <SearchActions.Provider value={{ search, searchNearby, searchNearbyAndAddToResults }}>
      <SearchState.Provider value={{ loading, error }}>
        <SearchResults.Provider value={results}>{children}</SearchResults.Provider>
      </SearchState.Provider>
    </SearchActions.Provider>
  );
};

// const [fwd, setFwd] = useState(false);

// const isInitial = useIsInitial();
// useEffect(() => {
//   if (isInitial) return;
//   else setFwd(true);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [searchResults]);

// useEffect(() => {
//   if (fwd) {
//     history.push(PATHS.RESULTS);
//     setFwd(false);
//   }
// }, [fwd, history, searchResults]);
