import { PATHS, GoTo } from 'store/GoToProvider';
import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useStateAndCache } from 'hooks/useStateAndCache';
import { searchByZip, searchByZipMultiple } from './functions/searchByZip';
import { useIsMounted } from 'hooks/useIsMounted';
import { useContext } from 'react';

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
  const isMountedRef = useIsMounted(); // for test env
  const goTo = useContext(GoTo);

  const [results, setResults] = useStateAndCache('results', new Results());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fwdToPath) return;
    goTo(fwdToPath);
    fwdToPath = '';
  }, [goTo, results]);

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
    if (!isMountedRef.current) return; // for test env
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
