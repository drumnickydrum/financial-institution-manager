import { fireEvent, screen } from '@testing-library/react';
import { favoriteButtonText } from 'components/FavoriteButton';
import { toolbarText } from 'components/TopAppBar';
import { institutionText } from 'pages/Institution';
import { searchFormText } from 'pages/Search';
import { FDIC_RESULTS_RETURN } from './responses';

export const debug = (chars) => screen.debug(document.body, chars);

// Toolbar
export const getGoBackBtn = () => screen.getByLabelText(toolbarText.labels.goBack);
export const getGoToSearchBtn = () => screen.getByLabelText(toolbarText.labels.goToSearch);
export const getGoToFavoritesBtn = () =>
  screen.getByLabelText(toolbarText.labels.goToFavorites);

// Search Page
export const getZipInput = () => screen.getByPlaceholderText(searchFormText.placeholder);
export const queryZipInput = () => screen.queryByPlaceholderText(searchFormText.placeholder);
export const getSubmitBtn = () =>
  screen.getByText(searchFormText.submitBtn).closest('button');
export const input = (userInput) => {
  fireEvent.change(getZipInput(), {
    target: { value: String(userInput) },
  });
};

// Results Page / Favorites
export const waitForResultsPage = () => screen.findByText(FDIC_RESULTS_RETURN[0].NAME);
export const getFiItem = () => screen.getByText(FDIC_RESULTS_RETURN[0].NAME);
export const getFi2Item = () => screen.getByText(FDIC_RESULTS_RETURN[1].NAME);
export const getFi3Item = () => screen.getByText(FDIC_RESULTS_RETURN[2].NAME);
export const queryFiItem = () => screen.queryByText(FDIC_RESULTS_RETURN[0].NAME);

// FavoriteButton
export const favBtn = {
  favBtnLabelText: (num, isFavorite) =>
    favoriteButtonText.toggleFavorite(FDIC_RESULTS_RETURN[num].NAME, isFavorite),
  favLabelText: favoriteButtonText.favoriteLabel(FDIC_RESULTS_RETURN[0].NAME),
  notFavLabelText: favoriteButtonText.notFavoriteLabel(FDIC_RESULTS_RETURN[0].NAME),
  getFavBtn(isFavorite) {
    return screen.getByLabelText(this.favBtnLabelText(0, isFavorite));
  },
  getFav2Btn(isFavorite) {
    return screen.getByLabelText(this.favBtnLabelText(1, isFavorite));
  },
  getFav3Btn(isFavorite) {
    return screen.getByLabelText(this.favBtnLabelText(2, isFavorite));
  },
  getFavTextBtn(isFavorite) {
    return screen.getByText(favoriteButtonText.textToggleFavorite(isFavorite));
  },
  getFavIcon() {
    return screen.queryByLabelText(this.favLabelText);
  },
  getNotFavIcon() {
    return screen.queryByLabelText(this.notFavLabelText);
  },
};

// Institution Page
export const getNotes = () => {
  return screen.getByLabelText(institutionText.notesLabel);
};
export const queryNotesTextArea = () => {
  return screen.queryByLabelText(institutionText.notesTextAreaLabel);
};
export const getNotesEditBtn = () => screen.getByText(institutionText.editNotesBtn);
export const getNotesSaveBtn = () => screen.getByText(institutionText.saveNotesBtn);
export const getNotesCancelBtn = () => screen.getByText(institutionText.cancelEditsBtn);
