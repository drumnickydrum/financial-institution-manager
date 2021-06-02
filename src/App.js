import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { UserProvider } from 'store/UserProvider';
import { Search } from 'pages/Search';
import { SearchProvider } from 'store/SearchProvider';
import { Results } from 'pages/Results';
import { Test } from 'pages/Test';
import { CssBaseline } from '@material-ui/core';

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
      <UserProvider>
        <SearchProvider>
          <CssBaseline />
          <Route path={PATHS.BASE} exact render={() => <Redirect to={PATHS.START} />} />
          <Route path={PATHS.SEARCH} component={Search} />
          <Route path={PATHS.RESULTS} component={Results} />
          <Route path={PATHS.FAVORITES} component={Favorites} />
          <Route path={`${PATHS.INSTITUTION}:id`} component={Institution} />
          <Route path='/test' component={Test} />
        </SearchProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

function Favorites() {
  return 'Favorites';
}

function Institution() {
  return 'Institution';
}
