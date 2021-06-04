import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { UserProvider } from 'store/UserProvider';
import { Search } from 'pages/Search/Search';
import { SearchProvider } from 'store/SearchProvider';
import { Results } from 'pages/Results/Results';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Institution } from 'pages/Institution/Institution';
import { Favorites } from 'pages/Favorites/Favorites';
import { TopAppBar } from 'components/TopAppBar';
import { GoToProvider, PATHS } from 'store/GoToProvider';
import { deepPurple, red } from '@material-ui/core/colors';
import { ResultsPending } from 'pages/Search/ResultsPending';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    favorite: {
      main: red[500],
    },
    type: 'dark',
  },
});

function App() {
  return (
    <BrowserRouter basename='/'>
      <GoToProvider>
        <UserProvider>
          <SearchProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <TopAppBar />
              <div id='topMargin' style={{ marginTop: '80px' }} />
              <Route path={PATHS.BASE} exact render={() => <Redirect to={PATHS.START} />} />
              <Route path={PATHS.SEARCH} component={Search} />
              <Route path={PATHS.RESULTS} component={Results} />
              <Route path={PATHS.FAVORITES} component={Favorites} />
              <Route path={`${PATHS.INSTITUTION}:ID`} component={Institution} />
              <Route path='/pending' component={ResultsPending} />
            </ThemeProvider>
          </SearchProvider>
        </UserProvider>
      </GoToProvider>
    </BrowserRouter>
  );
}

export default App;
