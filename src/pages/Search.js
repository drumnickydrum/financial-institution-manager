import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useState, useContext, useEffect } from 'react';
import { searchByZip, searchByZipMultiple } from 'store/actions/searchByZip';
import { ResultsPending } from './ResultsPending';
import { SetSearchResults } from 'store/SearchResults';

export const Search = () => {
  const setSearchResults = useContext(SetSearchResults);
  const [nearbyZips, setNearbyZips] = useState([]);

  const [zipInput, setZipInput] = useState('');
  const [noResults, setNoResults] = useState(null);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loading) return;
    if (error || noResults) setLoading(false);
  }, [error, noResults, loading]);

  const zipChange = ({ target: { value } }) => {
    if (!value) return setZipInput('');
    if (value.length > 5) return;
    if (value.match(/\D/gi)) return;
    setZipInput(value);
    if (error) setError('');
  };

  const search = async (e) => {
    e.preventDefault();
    if (!zipInput || zipInput.length < 5) return setError(searchFormText.errors.length);
    setLoading(true);
    const data = await searchByZip(zipInput);
    if (data.errors.zip) setError(`${zipInput}${searchFormText.errors.invalid}`);
    else if (data.errors.fdic) setError(searchFormText.errors.network);
    else if (data.results.fdic.length === 0) {
      setNoResults(zipInput);
      setNearbyZips(data.results.zip);
    } else {
      setSearchResults({
        zipSearched: zipInput,
        nearbyZips: data.results.zip,
        fiList: data.results.fdic,
      });
    }
  };

  const searchNearby = async (e) => {
    setLoading(true);
    const data = await searchByZipMultiple(nearbyZips.splice(0, 5));
    if (data.error?.match(/rejected/)) setError(searchFormText.errors.network);
    if (data.error?.match(/results/)) setNoResults(nearbyZips.join());
    else {
      setSearchResults({
        zipSearched: zipInput,
        nearbyZips: [],
        fiList: data.results,
      });
    }
  };

  return loading ? (
    <ResultsPending />
  ) : (
    <Container maxWidth='sm'>
      {noResults && (
        <>
          <Typography variant='h6' component='h1' style={{ textAlign: 'center' }}>
            {searchFormText.noResults}
            {noResults}
          </Typography>
          {nearbyZips?.length > 0 && (
            <>
              <Button variant='contained' color='primary' onClick={searchNearby}>
                {searchFormText.nearbyBtn}
              </Button>
              <Typography variant='h4'>or</Typography>
            </>
          )}
        </>
      )}
      <Typography variant='h6' component='h1' style={{ textAlign: 'center' }}>
        {noResults ? searchFormText.instructionNoResults : searchFormText.instruction}
      </Typography>
      <form onSubmit={search} style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          placeholder={searchFormText.placeholder}
          error={Boolean(error)}
          helperText={error}
          value={zipInput}
          onChange={zipChange}
          inputProps={{ type: 'tel' }}
        ></TextField>
        <Button variant='contained' color='primary' type='submit'>
          {searchFormText.submitBtn}
        </Button>
        {/* {favorites.length > 0 && (
          <>
            <Typography variant='h4'>or</Typography>
            <Button variant='contained' color='primary'>
              {searchFormText.favoritesBtn}
            </Button>
          </>
        )} */}
      </form>
    </Container>
  );
};

export const searchFormText = {
  noResults: 'No results for ',
  instruction: "I'm looking for a financial institution in...",
  instructionNoResults: 'Enter another ZIP code...',
  placeholder: 'ZIP',
  submitBtn: 'Search',
  nearbyBtn: 'Search Nearby ZIP Codes',
  favoritesBtn: 'My Favorites',
  errors: {
    length: 'Please enter a 5-digit U.S. zip code',
    invalid: ' is an invalid U.S. zip code',
    network: 'Network error, please try again',
  },
};
