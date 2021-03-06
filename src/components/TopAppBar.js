import { AppBar, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import { PATHS, GoTo, PrevPath } from 'store/GoToProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useContext } from 'react';
import useStyles from 'components/TopAppBar.styles';

export const TopAppBar = () => {
  const pathname = useLocation().pathname;
  const [page, setPage] = useState(getPage(pathname));
  useEffect(() => {
    const newPage = getPage(pathname);
    if (newPage !== page) setPage(newPage);
  }, [page, pathname]);

  const goTo = useContext(GoTo);
  const prevPathRef = useContext(PrevPath);

  const goBack = () => goTo('back');

  const isHome = prevPathRef.current.length === 0;

  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar style={{ maxWidth: '900px', width: '100%', margin: '0 auto' }}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          spacing={3}
        >
          <Grid item xs={3}>
            <IconButton
              edge='start'
              disabled={isHome}
              aria-label={toolbarText.labels.goBack}
              onClick={goBack}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6' component='h1' align='center'>
              {page}
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.navBtns}>
            <IconButton
              edge='start'
              aria-label={toolbarText.labels.goToSearch}
              className={classes.navBtnItem}
              style={{ marginRight: '1rem' }}
              disabled={pathname === PATHS.SEARCH}
              onClick={() => goTo(PATHS.SEARCH)}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              edge='start'
              aria-label={toolbarText.labels.goToFavorites}
              className={classes.navBtnItem}
              disabled={pathname === PATHS.FAVORITES}
              onClick={() => goTo(PATHS.FAVORITES)}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const getPage = (pathname) => {
  if (pathname.includes('search')) return toolbarText.titles.search;
  if (pathname.includes('results')) return toolbarText.titles.results;
  if (pathname.includes('institution')) return toolbarText.titles.institution;
  if (pathname.includes('favorites')) return toolbarText.titles.favorites;
};

export const toolbarText = {
  labels: {
    goBack: 'go to previous page',
    goToSearch: 'go to search page',
    goToFavorites: 'go to my favorites page',
  },
  titles: {
    search: 'New Search',
    results: 'Results',
    institution: 'Info',
    favorites: 'Favorites',
  },
};
