import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Context, SetContext } from './Context';
import { PATHS } from './App';

export const Search = () => {
  const history = useHistory();
  const { setZip } = useContext(SetContext);
  const { zip, favorites } = useContext(Context);
  const [zipInput, setZipInput] = useState(zip);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [zipInput]);

  const zipChange = ({ target: { value } }) => {
    if (!value) return setZipInput('');
    if (value.length > 5) return;
    if (value.match(/\D/gi)) return;
    setZipInput(value);
  };

  const search = (e) => {
    e.preventDefault();
    if (!zipInput || zipInput.length < 5) return setError(searchFormText.errors.length);
    setZip(zipInput);
    history.push(PATHS.RESULTS);
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h6' component='h1' style={{ textAlign: 'center' }}>
        {searchFormText.instruction}
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
  placeholder: 'Zip',
  submitBtn: 'Search',
  favoritesBtn: 'My Favorites',
  errors: {
    length: 'Please enter a 5-digit U.S. zip code',
    invalid: ' is an invalid U.S. zip code',
  },
};
