import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { UserProvider } from 'store/UserProvider';
import { Search } from 'pages/Search';
import { SearchProvider } from 'store/SearchProvider';
import { Results } from 'pages/Results';
import { Test } from 'pages/Test';
import { CssBaseline } from '@material-ui/core';
import { Institution } from 'pages/Institution';
import { Favorites } from 'pages/Favorites';
import { TopAppBar } from 'components/TopAppBar';
import { GoToProvider, PATHS } from 'store/GoToProvider';

function App() {
  return (
    <BrowserRouter basename='/'>
      <GoToProvider>
        <UserProvider>
          <SearchProvider>
            <CssBaseline />
            <TopAppBar />
            <div id='topMargin' style={{ marginTop: '80px' }} />
            <Route path={PATHS.BASE} exact render={() => <Redirect to={PATHS.START} />} />
            <Route path={PATHS.SEARCH} component={Search} />
            <Route path={PATHS.RESULTS} component={Results} />
            <Route path={PATHS.FAVORITES} component={Favorites} />
            <Route path={`${PATHS.INSTITUTION}:ID`} component={Institution} />
            <Route path='/test' component={Test} />
          </SearchProvider>
        </UserProvider>
      </GoToProvider>
    </BrowserRouter>
  );
}

export default App;
