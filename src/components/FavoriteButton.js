import { IconButton } from '@material-ui/core';
import { useContext } from 'react';
import { UserInput, UserInputActions } from 'store/UserProvider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export const FavoriteButton = ({ item }) => {
  const { addToFavorites, removeFromFavorites } = useContext(UserInputActions);
  const { favorites } = useContext(UserInput);

  const isFavorite = favorites ? item?.ID in favorites : false;

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) removeFromFavorites(item?.ID);
    else addToFavorites(item);
  };

  return (
    <IconButton
      aria-label={favoriteButtonText.toggleFavorite(item?.NAME, isFavorite)}
      onClick={toggleFavorite}
    >
      {isFavorite ? (
        <FavoriteIcon aria-label={favoriteButtonText.favoriteLabel(item?.NAME)} />
      ) : (
        <FavoriteBorderIcon aria-label={favoriteButtonText.notFavoriteLabel(item?.NAME)} />
      )}
    </IconButton>
  );
};

export const favoriteButtonText = {
  toggleFavorite: (name, isFavorite) => {
    if (isFavorite) return `Remove ${name} from favorites`;
    else return `Add ${name} to favorites`;
  },
  favoriteLabel: (name) => `${name} is a favorite`,
  notFavoriteLabel: (name) => `${name} is not a favorite`,
};
