import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useState, useContext } from 'react';
import { ResultsPending } from './ResultsPending';
import { SearchActions, SearchResults, SearchState } from 'store/SearchProvider';
import useStyles from './Search.styles';
import { UserInput } from 'store/UserProvider';
import { GoTo, PATHS } from 'store/GoToProvider';

export const Search = () => {
  const { search, searchNearby } = useContext(SearchActions);
  const { loading, error } = useContext(SearchState);
  const { nearbyZips, fiList, zipSearched } = useContext(SearchResults);
  const { favorites } = useContext(UserInput);

  const [alreadySearched, setAlreadySearched] = useState(false);
  const [zipInput, setZipInput] = useState('');
  const [userError, setUserError] = useState('');

  const canSearchNearby = nearbyZips.length > 0;
  const noResults = alreadySearched && fiList.length === 0;
  const errorMessage = userError || getErrorMessage(error, zipInput);
  const hasFavorites = Object.keys(favorites).length > 0;

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
      hasFavorites={hasFavorites}
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
  hasFavorites,
}) => {
  const goTo = useContext(GoTo);
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
        <Button
          className={classes.searchBtn}
          variant='contained'
          color='primary'
          type='submit'
        >
          {searchFormText.submitBtn}
        </Button>
      </form>
      {hasFavorites && (
        <>
          <Typography variant='h6' component='h4' align='center'>
            or
          </Typography>
          <Button
            className={classes.favBtn}
            variant='contained'
            color='primary'
            onClick={() => goTo(PATHS.FAVORITES)}
          >
            {searchFormText.favoritesBtn}
          </Button>
        </>
      )}
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
  favoritesBtn: 'Show My Favorites',
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
