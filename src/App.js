import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { ContextProvider } from 'store/Context';
import { Search } from 'pages/Search';

export const PATHS = {
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
      <ContextProvider>
        <Route path={PATHS.BASE} exact render={() => <Redirect to={PATHS.START} />} />
        <Route path={PATHS.SEARCH} component={Search} />
        <Route path={PATHS.RESULTS} component={Results} />
        <Route path={PATHS.FAVORITES} component={Favorites} />
        <Route path={`${PATHS.INSTITUTION}:id`} component={Institution} />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;

function Results() {
  return 'Results';
}

function Favorites() {
  return 'Favorites';
}

function Institution() {
  return 'Institution';
}
