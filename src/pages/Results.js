import { Button, Card, Container, IconButton, Typography } from '@material-ui/core';
import { PATHS } from 'App';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { SearchActions, SearchResults, SearchState } from 'store/SearchProvider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { UserInput, UserInputActions } from 'store/UserProvider';

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
};

const FiItem = ({ item }) => {
  const history = useHistory();
  const { favorites } = useContext(UserInput);
  const { addToFavorites, removeFromFavorites } = useContext(UserInputActions);

  const isFavorite = favorites ? item.ID in favorites : false;

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) removeFromFavorites(item.ID);
    else addToFavorites(item);
  };

  const onContainerClick = () => {
    history.push(`${PATHS.INSTITUTION}${item.ID}`);
  };

  return (
    <Card
      variant='outlined'
      raised
      style={{ display: 'flex', margin: '10px', padding: '10px' }}
    >
      <Container onClick={onContainerClick}>
        <Typography variant='body1'>{item.NAME}</Typography>
        <Typography variant='body2'>{item.ADDRESS}</Typography>
        <Typography variant='body2'>
          {item.CITY},&nbsp;{item.STALP}&nbsp;
          {item.ZIP}
        </Typography>
      </Container>
      <IconButton
        aria-label={resultsText.toggleFavorite(item.NAME, isFavorite)}
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <FavoriteIcon aria-label={resultsText.favoriteLabel(item.NAME)} />
        ) : (
          <FavoriteBorderIcon aria-label={resultsText.notFavoriteLabel(item.NAME)} />
        )}
      </IconButton>
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
  toggleFavorite: (name, isFavorite) => {
    if (isFavorite) return `Remove ${name} from favorites`;
    else return `Add ${name} to favorites`;
  },
  favoriteLabel: (name) => `${name} is a favorite`,
  notFavoriteLabel: (name) => `${name} is not a favorite`,
};

const getErrorMessage = (error) => {
  if (!error) return '';
  if (error.includes('results')) return resultsText.errors.noResultsNearby;
  else return resultsText.errors.network;
};
