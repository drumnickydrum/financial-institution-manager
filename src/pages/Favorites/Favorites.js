import { Box, Button, Card, Container, Divider, Grid, Typography } from '@material-ui/core';
import { PATHS, GoTo } from 'store/GoToProvider';
import { useContext } from 'react';
import { UserInput, UserInputActions } from 'store/UserProvider';
import useStyles from './Favorites.styles';

export const Favorites = () => {
  const goTo = useContext(GoTo);

  const { favorites, notes } = useContext(UserInput);
  const isInitial = favorites === null || notes === null;
  const { clearAllFavorites } = useContext(UserInputActions);

  const onClick = (e) => {
    goTo(`${PATHS.INSTITUTION}${e.currentTarget.id}`);
  };

  const classes = useStyles();
  return isInitial ? null : (
    <Container>
      {Object.keys(favorites).length === 0 ? (
        <>
          <Typography variant='h6' align='center'>
            {favoritesText.noFavorites}
          </Typography>
          <Button
            className={classes.goToSearchBtn}
            variant='contained'
            color='primary'
            onClick={() => goTo(PATHS.SEARCH)}
          >
            {favoritesText.goToSearch}
          </Button>
        </>
      ) : (
        <>
          <Grid container justify='center' spacing={3}>
            {Object.values(favorites).map((fi) => (
              <Grid item key={fi.ID} xs={12} sm={6} md={4}>
                <Card className={classes.card} id={fi.ID} onClick={onClick}>
                  <Typography className={classes.name} align='center'>
                    {fi.NAME}
                  </Typography>
                  <Divider />
                  <Typography variant='body2' align='center'>
                    {fi.ADDRESS}
                  </Typography>
                  <Typography variant='body2' align='center'>
                    {fi.CITY},&nbsp;{fi.STALP}&nbsp;{fi.ZIP}
                  </Typography>
                  <Box className={classes.notesBox}>
                    <Typography>Notes:</Typography>
                    <Divider />
                    <Typography className={classes.notes} variant='body2'>
                      {notes[fi.ID]}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button
            className={classes.clearAllBtn}
            variant='contained'
            color='secondary'
            onClick={clearAllFavorites}
          >
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
  goToSearch: 'Go to search',
};
