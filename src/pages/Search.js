import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useState, useContext } from 'react';
import { ResultsPending } from './ResultsPending';
import { SearchActions, SearchResults, SearchState } from 'store/SearchProvider';
import useStyles from './Search.styles';

export const Search = () => {
  const { search, searchNearby } = useContext(SearchActions);
  const { loading, error } = useContext(SearchState);
  const { nearbyZips, fiList, zipSearched } = useContext(SearchResults);

  const [alreadySearched, setAlreadySearched] = useState(false);
  const [zipInput, setZipInput] = useState('');
  const [userError, setUserError] = useState('');

  const canSearchNearby = nearbyZips.length > 0;
  const noResults = alreadySearched && fiList.length === 0;
  const errorMessage = userError || getErrorMessage(error, zipInput);

  const zipChange = ({ target: { value } }) => {
    if (!value) return setZipInput('');
    if (value.length > 5) return;
    if (value.match(/\D/gi)) return;
    setZipInput(value);
    if (userError) setUserError('');
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (!zipInput || zipInput.length < 5) return setUserError(searchFormText.errors.length);
    setAlreadySearched(true);
    search(zipInput);
  };

  return loading ? (
    <ResultsPending />
  ) : (
    <SearchJSX
      noResults={noResults}
      canSearchNearby={canSearchNearby}
      searchNearby={searchNearby}
      onSearchSubmit={onSearchSubmit}
      errorMessage={errorMessage}
      zipInput={zipInput}
      zipChange={zipChange}
      zipSearched={zipSearched}
    />
  );
};

const SearchJSX = ({
  noResults,
  canSearchNearby,
  searchNearby,
  onSearchSubmit,
  errorMessage,
  zipInput,
  zipChange,
  zipSearched,
}) => {
  const classes = useStyles();
  return (
    <Container maxWidth='sm' className={classes.root}>
      {noResults && (
        <>
          <Typography variant='h6' component='h2' align='center'>
            {searchFormText.noResults}
            {zipSearched}
          </Typography>
          {canSearchNearby && (
            <>
              <Button variant='contained' color='primary' onClick={searchNearby}>
                {searchFormText.nearbyBtn}
              </Button>
              <Typography variant='h6' component='h3'>
                or
              </Typography>
            </>
          )}
        </>
      )}
      <Typography variant='h6' component='h1' align='center'>
        {noResults ? searchFormText.instructionNoResults : searchFormText.instruction}
      </Typography>
      <form onSubmit={onSearchSubmit}>
        <TextField
          placeholder={searchFormText.placeholder}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          value={zipInput}
          onChange={zipChange}
          inputProps={{ type: 'tel' }}
        ></TextField>
        <Button variant='contained' color='primary' type='submit'>
          {searchFormText.submitBtn}
        </Button>
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

const getErrorMessage = (error, zipInput) => {
  if (!error) return '';
  if (error.includes('rejected')) return searchFormText.errors.network;
  if (error.includes('invalid')) return `${zipInput}${searchFormText.errors.invalid}`;
  return 'There was an error.  Please try again.';
};
