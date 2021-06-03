import { screen } from '@testing-library/react';
import { favoriteButtonText } from 'components/FavoriteButton';
import { FDIC_RESULTS_RETURN } from './responses';

export const favBtn = {
  favBtnLabelText: (isFavorite) =>
    favoriteButtonText.toggleFavorite(FDIC_RESULTS_RETURN[0].NAME, isFavorite),
  favLabelText: favoriteButtonText.favoriteLabel(FDIC_RESULTS_RETURN[0].NAME),
  notFavLabelText: favoriteButtonText.notFavoriteLabel(FDIC_RESULTS_RETURN[0].NAME),
  getFavBtn(isFavorite) {
    return screen.getByLabelText(this.favBtnLabelText(isFavorite));
  },
  getFavIcon() {
    return screen.queryByLabelText(this.favLabelText);
  },
  getNotFavIcon() {
    return screen.queryByLabelText(this.notFavLabelText);
  },
};
