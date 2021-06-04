import { createContext } from 'react';
import { useRef } from 'react';
import { useHistory, useLocation } from 'react-router';

export const PATHS = {
  BASE: '/',
  SEARCH: '/search',
  RESULTS: '/results',
  FAVORITES: '/favorites',
  INSTITUTION: '/institution/',
};
PATHS.START = PATHS.SEARCH;

export const GoTo = createContext();
export const GoToProvider = ({ children }) => {
  const history = useHistory();
  const pathname = useLocation().pathname;
  const prevPathRef = useRef([pathname]);

  const goTo = (path) => {
    if (path === 'back') {
      const newPath = prevPathRef.current.pop();
      history.push(newPath || '/');
    } else {
      prevPathRef.current.push(pathname);
      history.push(path);
    }
  };

  return <GoTo.Provider value={goTo}>{children}</GoTo.Provider>;
};
