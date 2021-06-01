import { createContext } from 'react';
import { getLS, useStateAndLS } from 'utils/storage';

const INITIAL_STATE = {
  zipSearched: getLS('zipSearched') || '',
  nearbyZips: getLS('nearbyZips') || [],
  fdic: getLS('fdic') || [],
};

export const SetSearchResults = createContext();
export const SearchResults = createContext();
export const SearchResultsProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useStateAndLS(INITIAL_STATE);

  return (
    <SetSearchResults.Provider value={setSearchResults}>
      <SearchResults.Provider value={searchResults}>{children}</SearchResults.Provider>
    </SetSearchResults.Provider>
  );
};

/**
 *
 *      {
 *          zip: [90210, 90209, 90208],
 *          fdic: {
 *              90210: [
 *              {
 *                  zip: 90210,
 *                  name: a bank,
 *              },
 *              {
 *                  zip: 90210,
 *                  name: b bank,
 *              },
 *              {
 *                  zip: 90210,
 *                  name: c bank,
 *              },
 *          ]
 *      }
 *
 */
