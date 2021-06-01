import { Button, Card, Container, Typography } from '@material-ui/core';
import { PATHS } from 'App';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { searchByZipMultiple } from 'store/actions/searchByZip';
import { SearchResults, SetSearchResults } from 'store/SearchResults';

export const Results = () => {
  const history = useHistory();

  const { zipSearched, nearbyZips, fdicResults } = useContext(SearchResults);
  const setSearchResults = useContext(SetSearchResults);

  const [showNearby, setShowNearby] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const goBack = () => {
    history.push(PATHS.SEARCH);
  };

  const searchNearby = async () => {
    setShowNearby(true);
    setLoading(true);
    const data = await searchByZipMultiple(nearbyZips.splice(0, 5));
    if (data.error) {
      if (data.error.includes('results')) setError(resultsText.errors.noResultsNearby);
      if (data.error.includes('rejected')) setError(resultsText.errors.rejected);
    } else {
      setSearchResults((prev) => {
        const newResults = [...prev.fdicResults];
        newResults.push(...data.results);
        return { ...prev, nearbyZips: [], fdicResults: newResults };
      });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth='sm'>
      <Button variant='contained' color='primary' onClick={goBack}>
        {resultsText.goBackBtn}
      </Button>
      <Typography variant='h6' component='h2' style={{ textAlign: 'center' }}>
        Financial Institutions Near {zipSearched}
      </Typography>
      {fdicResults?.map((result, i) => (
        <Card
          key={result.ID || `result-${i}`}
          variant='outlined'
          raised
          style={{ display: 'flex' }}
        >
          <Container>
            <Typography variant='body1'>{result.NAME}</Typography>
            <Typography variant='body2'>{result.ADDRESS}</Typography>
            <Typography variant='body2'>
              {result.CITY},&nbsp;{result.STALP}&nbsp;
              {result.ZIP}
            </Typography>
          </Container>
          <Button>FAV</Button>
        </Card>
      ))}
      {!showNearby && nearbyZips?.length > 0 && (
        <Button variant='contained' color='primary' onClick={searchNearby}>
          {resultsText.nearbyBtn}
          {zipSearched}
        </Button>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </Container>
  );
};

export const resultsText = {
  goBackBtn: 'Back to search',
  nearbyBtn: 'More Locations Near ',
  errors: {
    noResultsNearby: 'No results in nearby ZIP codes',
    rejected: 'Error loading additional search results',
  },
};
