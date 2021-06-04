import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'setupTests';
import { VALID_ZIP_WITH_RESULTS } from 'test/inputs';
import {
  input,
  favBtn,
  getGoToSearchBtn,
  waitForResultsPage,
  getSubmitBtn,
  debug,
  getGoToFavoritesBtn,
  getFiItem,
  getNotesEditBtn,
  queryNotesTextArea,
  getNotesSaveBtn,
  queryFiItem,
  getFi2Item,
  getFi3Item,
} from 'test/helpers';
import { favoritesText } from './Favorites';

describe('Favorites Page', () => {
  beforeEach(async () => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
    render(<App />);
  });

  afterEach(() => {
    userEvent.click(getGoToSearchBtn());
  });

  it('Shows no favorites if none selected', () => {
    userEvent.click(getGoToFavoritesBtn());
    expect(queryFiItem()).toBeFalsy();
    screen.getByText(favoritesText.noFavorites);
  });

  describe('favs', () => {
    beforeEach(async () => {
      input(VALID_ZIP_WITH_RESULTS);
      userEvent.click(getSubmitBtn());
      await waitForResultsPage();
    });

    it('Displays favorite locations with notes', async () => {
      userEvent.click(favBtn.getFavBtn(false));
      userEvent.click(getFiItem());
      userEvent.click(getNotesEditBtn());
      userEvent.type(queryNotesTextArea(), 'test note');
      userEvent.click(getNotesSaveBtn());
      await screen.findByText('test note');
      userEvent.click(getGoToFavoritesBtn());
      expect(window.location.pathname.includes('favorites')).toBe(true);

      getFiItem();
      screen.getByText('test note');
    });

    it('Links to insitution info', () => {
      userEvent.click(getGoToFavoritesBtn());
      userEvent.click(getFiItem());
      expect(window.location.pathname.includes('institution')).toBe(true);
    });

    it('Clears all favorites', async () => {
      userEvent.click(favBtn.getFav2Btn(false));
      userEvent.click(favBtn.getFav3Btn(false));
      userEvent.click(getGoToFavoritesBtn());
      expect(window.location.pathname.includes('favorites')).toBe(true);

      getFiItem();
      getFi2Item();
      getFi3Item();

      userEvent.click(screen.getByText(favoritesText.clearAll));
      await screen.findByText(favoritesText.noFavorites);
    });
  });
});
