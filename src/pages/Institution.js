import { Button, Card, Container, Typography } from '@material-ui/core';
import { PATHS } from 'App';
import { useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { SearchResults } from 'store/SearchProvider';
import { UserInput } from 'store/UserProvider';

export const Institution = () => {
  const history = useHistory();

  const { ID } = useParams();
  const { fiList } = useContext(SearchResults);
  const { favorites } = useContext(UserInput);

  console.log(fiList.filter((item) => item.ID === ID));

  const goBack = () => {
    history.push(PATHS.RESULTS);
  };

  const goHome = () => {
    history.push(PATHS.SEARCH);
  };

  return (
    <Container>
      <Container style={{ display: 'flex' }}>
        <Button variant='contained' color='primary' onClick={goHome}>
          {institutionText.goHomeBtn}
        </Button>
        <Button variant='contained' color='secondary' onClick={goBack}>
          {institutionText.goBackBtn}
        </Button>
      </Container>
      <Card>
        <Typography variant='h6'>{ID}</Typography>
      </Card>
    </Container>
  );
};

const institutionText = {
  goBackBtn: 'Back to results',
  goHomeBtn: 'Back to search',
};
