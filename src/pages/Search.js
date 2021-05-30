import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useState, useContext } from 'react';
import { Context } from 'store/Context';
import { searchByZip } from 'store/actions/searchByZip';

export const Search = () => {
  const { zip, favorites } = useContext(Context);
  const [zipInput, setZIPInput] = useState(zip);
  const [error, setError] = useState('');
  const [noResults, setNoResults] = useState(false);

  const zipChange = ({ target: { value } }) => {
    if (!value) return setZIPInput('');
    if (value.length > 5) return;
    if (value.match(/\D/gi)) return;
    setZIPInput(value);
    if (error) setError('');
  };

  const search = async (e) => {
    e.preventDefault();
    if (!zipInput || zipInput.length < 5) return setError(searchFormText.errors.length);
    // spinner or results page skeleton
    const result = await searchByZip(zipInput);
    console.log(result);
    // if zip was invalid -> setError(invalid)
    // else if fdic rejected -> setNetworkError(true) "network error, please try again"
    // else if no results -> setNoResults(true) and conditionally render the nearby option
  };

  return (
    <Container maxWidth='sm'>
      {noResults && (
        <>
          <Button variant='contained' color='primary'>
            {searchFormText.nearbyBtn}
          </Button>
          <Typography variant='h4'>or</Typography>
        </>
      )}
      <Typography variant='h6' component='h1' style={{ textAlign: 'center' }}>
        {noResults ? searchFormText.noResultsInstruction : searchFormText.instruction}
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
        {favorites.length > 0 && (
          <>
            <Typography variant='h4'>or</Typography>
            <Button variant='contained' color='primary'>
              {searchFormText.favoritesBtn}
            </Button>
          </>
        )}
      </form>
    </Container>
  );
};

export const searchFormText = {
  instruction: "I'm looking for a financial institution in...",
  noResultsInstruction: 'Enter another ZIP code...',
  placeholder: 'ZIP',
  submitBtn: 'Search',
  nearbyBtn: 'Search Nearby ZIP Codes',
  favoritesBtn: 'My Favorites',
  errors: {
    length: 'Please enter a 5-digit U.S. zip code',
    invalid: ' is an invalid U.S. zip code',
  },
};
