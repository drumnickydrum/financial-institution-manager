import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { UserProvider } from 'store/UserProvider';
import { Search } from 'pages/Search';
import { SearchProvider } from 'store/SearchProvider';
import { Results } from 'pages/Results';
import { Test } from 'pages/Test';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Institution } from 'pages/Institution';
import { Favorites } from 'pages/Favorites';
import { TopAppBar } from 'components/TopAppBar';
import { GoToProvider, PATHS } from 'store/GoToProvider';
import { deepPurple, red } from '@material-ui/core/colors';

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
              <Route path='/test' component={Test} />
            </ThemeProvider>
          </SearchProvider>
        </UserProvider>
      </GoToProvider>
    </BrowserRouter>
  );
}

export default App;
