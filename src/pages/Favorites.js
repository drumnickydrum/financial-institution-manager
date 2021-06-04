import { Button, Card, Container, Grid, Typography } from '@material-ui/core';
import { PATHS, GoTo } from 'store/GoToProvider';
import { useContext } from 'react';
import { UserInput, UserInputActions } from 'store/UserProvider';

export const Favorites = () => {
  const goTo = useContext(GoTo);

  const { favorites, notes } = useContext(UserInput);
  const isInitial = favorites === null || notes === null;
  const { clearAllFavorites } = useContext(UserInputActions);

  const onClick = (e) => {
    goTo(`${PATHS.INSTITUTION}${e.currentTarget.id}`);
  };

  return isInitial ? null : (
    <Container>
      {Object.keys(favorites).length === 0 ? (
        <Typography variant='h6'>{favoritesText.noFavorites}</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {Object.values(favorites).map((fi) => (
              <Grid item key={fi.ID} xs={12} sm={6} md={4}>
                <Card id={fi.ID} onClick={onClick}>
                  <Typography variant='h6'>{fi.NAME}</Typography>
                  <Typography variant='body1'>{fi.ADDRESS}</Typography>
                  <Typography variant='body1'>
                    {fi.CITY},&nbsp;{fi.STALP}&nbsp;{fi.ZIP}
                  </Typography>
                  <Typography variant='h6'>Notes:</Typography>
                  <Typography variant='body2'>{notes[fi.ID]}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button variant='contained' color='secondary' onClick={clearAllFavorites}>
            {favoritesText.clearAll}
          </Button>
        </>
      )}
    </Container>
  );
};

export const favoritesText = {
  noFavorites: 'You have no favorites',
  clearAll: 'Remove all from favorites',
};
