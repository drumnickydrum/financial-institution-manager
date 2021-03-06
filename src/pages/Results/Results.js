import { Button, Card, Container, Typography } from '@material-ui/core';
import { PATHS, GoTo } from 'store/GoToProvider';
import { FavoriteButton } from 'components/FavoriteButton';
import { useContext, useState } from 'react';
import { SearchActions, SearchResults, SearchState } from 'store/SearchProvider';
import useStyles from './Results.styles';

export const Results = () => {
  const { loading, error } = useContext(SearchState);
  const { searchNearbyAndAddToResults } = useContext(SearchActions);
  const { zipSearched, nearbyZips, fiList } = useContext(SearchResults);

  const [showingNearbyResults, setShowingNearbyResults] = useState(false);

  const showNearbyBtn = !showingNearbyResults && nearbyZips.length > 0;
  const errorMessage = getErrorMessage(error);

  const onNearbyClick = () => {
    setShowingNearbyResults(true);
    searchNearbyAndAddToResults();
  };

  return (
    <ResultsJSX
      zipSearched={zipSearched}
      fiList={fiList}
      showNearbyBtn={showNearbyBtn}
      onNearbyClick={onNearbyClick}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
};

const ResultsJSX = ({
  zipSearched,
  fiList,
  showNearbyBtn,
  onNearbyClick,
  loading,
  errorMessage,
}) => {
  const classes = useStyles();
  return (
    <Container maxWidth='sm' className={classes.root}>
      <Typography variant='h6' component='h1' align='center'>
        Financial Institutions Near {zipSearched}
      </Typography>
      {fiList &&
        fiList.map((item, i) => <FiItem key={item.ID || `FiItem${i}`} item={item} />)}
      {showNearbyBtn && (
        <Button
          className={classes.nearbyBtn}
          variant='contained'
          color='primary'
          onClick={onNearbyClick}
        >
          {resultsText.nearbyBtn}
          {zipSearched}
        </Button>
      )}
      {loading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </Container>
  );
};

const FiItem = ({ item }) => {
  const goTo = useContext(GoTo);
  const classes = useStyles();

  const onContainerClick = () => {
    goTo(`${PATHS.INSTITUTION}${item.ID}`);
  };

  return (
    <Card variant='outlined' raised className={classes.card}>
      <Container onClick={onContainerClick}>
        <Typography variant='body1'>{item.NAME}</Typography>
        <Typography variant='body2'>{item.ADDRESS}</Typography>
        <Typography variant='body2'>
          {item.CITY},&nbsp;{item.STALP}&nbsp;
          {item.ZIP}
        </Typography>
      </Container>
      <FavoriteButton item={item} />
    </Card>
  );
};

export const resultsText = {
  goBackBtn: 'Back to search',
  nearbyBtn: 'More Locations Near ',
  errors: {
    noResultsNearby: 'No results in nearby ZIP codes',
    network: 'Error loading additional search results',
  },
};

const getErrorMessage = (error) => {
  if (!error) return '';
  if (error.includes('results')) return resultsText.errors.noResultsNearby;
  else return resultsText.errors.network;
};
