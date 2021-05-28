import { BrowserRouter, Redirect, Route } from 'react-router-dom';

const PATHS = {
  BASE: '/',
  SEARCH: '/search',
  RESULTS: '/results',
  FAVORITES: '/favorites',
  INSTITUTION: '/institution/',
};
PATHS.START = PATHS.SEARCH;

function App() {
  return (
    <BrowserRouter basename='/'>
      <Route path={PATHS.BASE} exact render={() => <Redirect to={PATHS.START} />} />
      <Route path={PATHS.SEARCH} component={Search} />
      <Route path={PATHS.RESULTS} component={Results} />
      <Route path={PATHS.FAVORITES} component={Favorites} />
      <Route path={`${PATHS.INSTITUTION}:id`} component={Institution} />
    </BrowserRouter>
  );
}

export default App;

function Search() {
  return 'Search';
}

function Results() {
  return 'Results';
}

function Favorites() {
  return 'Favorites';
}

function Institution() {
  return 'Institution';
}
