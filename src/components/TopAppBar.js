import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import { PATHS, GoTo } from 'store/GoToProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useContext } from 'react';

export const TopAppBar = () => {
  const pathname = useLocation().pathname;
  const [page, setPage] = useState(getPage(pathname));
  useEffect(() => {
    const newPage = getPage(pathname);
    if (newPage !== page) setPage(newPage);
  }, [page, pathname]);

  const goTo = useContext(GoTo);

  const goBack = () => goTo('back');

  const backBtnStyles = {
    visibility: page !== toolbarText.titles.search ? 'visible' : 'hidden',
  };

  return (
    <AppBar>
      <Toolbar style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          style={backBtnStyles}
          edge='start'
          aria-label={toolbarText.labels.goBack}
          onClick={goBack}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant='h6'>{page}</Typography>
        <Container>
          <IconButton
            edge='start'
            aria-label={toolbarText.labels.goToSearch}
            onClick={() => goTo(PATHS.SEARCH)}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            edge='start'
            aria-label={toolbarText.labels.goToFavorites}
            onClick={() => goTo(PATHS.FAVORITES)}
          >
            <FavoriteBorderIcon />
          </IconButton>
        </Container>
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
    search: 'F.I. Manager',
    results: 'Results',
    institution: 'Info',
    favorites: 'Favorites',
  },
};
