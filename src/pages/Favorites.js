import { Container, Grid } from '@material-ui/core';

export const Favorites = () => {
  const favorites = {};
  return (
    <Container>
      <Grid container>{favorites.map}</Grid>
    </Container>
  );
};
