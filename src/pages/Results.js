import { Button, Card, Container, Typography } from '@material-ui/core';
import { PATHS } from 'App';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { SearchActions, SearchResults, SearchState } from 'store/SearchProvider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useMemo } from 'react';

export const Results = () => {
  const history = useHistory();

  const { loading, error } = useContext(SearchState);
  const { searchNearbyAndAddToResults } = useContext(SearchActions);
  const results = useContext(SearchResults);

  const [showingNearbyResults, setShowingNearbyResults] = useState(false);

  const showNearbyBtn = !showingNearbyResults && results?.nearbyZips?.length > 0;
  const errorMessage = getErrorMessage(error);

  const goBack = () => {
    history.push(PATHS.SEARCH);
  };

  const onNearbyClick = () => {
    setShowingNearbyResults(true);
    searchNearbyAndAddToResults();
  };

  return (
    <ResultsJSX
      goBack={goBack}
      zipSearched={results?.zipSearched || ''}
      fiList={results?.fiList || []}
      showNearbyBtn={showNearbyBtn}
      onNearbyClick={onNearbyClick}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
};

const ResultsJSX = ({
  goBack,
  zipSearched,
  fiList,
  showNearbyBtn,
  onNearbyClick,
  loading,
  errorMessage,
}) => {
  const memo = useMemo(() => {
    return (
      <Container maxWidth='sm'>
        <Button variant='contained' color='primary' onClick={goBack}>
          {resultsText.goBackBtn}
        </Button>
        <Typography variant='h6' component='h2' style={{ textAlign: 'center' }}>
          Financial Institutions Near {zipSearched}
        </Typography>
        {fiList &&
          fiList.map((item, i) => <FiItem key={item.ID || `FiItem${i}`} item={item} />)}
        {showNearbyBtn && (
          <Button variant='contained' color='primary' onClick={onNearbyClick}>
            {resultsText.nearbyBtn}
            {zipSearched}
          </Button>
        )}
        {loading && <div>Loading...</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </Container>
    );
  }, [showNearbyBtn, errorMessage, fiList, goBack, loading, onNearbyClick, zipSearched]);
  return memo;
};

const FiItem = ({ item }) => {
  const favorites = {};
  if (item.ID in favorites) item.favorite = true;
  const memo = useMemo(() => {
    return (
      <Card
        variant='outlined'
        raised
        style={{ display: 'flex', margin: '10px', padding: '10px' }}
      >
        <Container>
          <Typography variant='body1'>{item.NAME}</Typography>
          <Typography variant='body2'>{item.ADDRESS}</Typography>
          <Typography variant='body2'>
            {item.CITY},&nbsp;{item.STALP}&nbsp;
            {item.ZIP}
          </Typography>
        </Container>
        <Button>{item.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}</Button>
      </Card>
    );
  }, [item.ADDRESS, item.CITY, item.NAME, item.STALP, item.ZIP, item.favorite]);
  return memo;
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
