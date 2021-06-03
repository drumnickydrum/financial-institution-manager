import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'setupTests';
import { searchFormText } from './Search';
import { input } from 'pages/Search.test';
import { VALID_ZIP_WITH_RESULTS } from 'test/inputs';
import { resultsText } from './Results';
import { FDIC_NEARBY_RETURN, FDIC_RESULTS_RETURN } from 'test/responses';
import { favoriteButtonText } from 'components/FavoriteButton';

describe('Results Page', () => {
  let goBackBtn;
  beforeEach(async () => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
    render(<App />);

    const zipInput = await screen.findByPlaceholderText(searchFormText.placeholder);
    const submitBtn = screen.getByText(searchFormText.submitBtn).closest('button');
    input(zipInput, VALID_ZIP_WITH_RESULTS);
    userEvent.click(submitBtn);
    const goBackBtnText = await screen.findByText((content) =>
      content.includes(resultsText.goBackBtn)
    );
    goBackBtn = goBackBtnText.closest('button');
  });

  afterEach(() => {
    userEvent.click(goBackBtn);
  });

  it('Displays results', () => {
    screen.getByText(FDIC_RESULTS_RETURN[0].NAME);
    screen.getByText(FDIC_RESULTS_RETURN[1].NAME);
    screen.getByText(FDIC_RESULTS_RETURN[2].NAME);
  });

  it('Displays more results on nearby btn click', async () => {
    const nearbyBtnText = await screen.findByText((content) =>
      content.includes(resultsText.nearbyBtn)
    );
    const nearbyBtn = nearbyBtnText.closest('button');
    userEvent.click(nearbyBtn);
    await screen.findAllByText(FDIC_NEARBY_RETURN[0].NAME);
    screen.getAllByText(FDIC_NEARBY_RETURN[1].NAME);
    screen.getAllByText(FDIC_NEARBY_RETURN[2].NAME);
  });

  it('Toggles favorites', async () => {
    const name = FDIC_RESULTS_RETURN[0].NAME;
    const favBtn = screen.getByLabelText(favoriteButtonText.toggleFavorite(name, false));
    const favIconLabel = favoriteButtonText.favoriteLabel(name);
    const notFavIconLabel = favoriteButtonText.notFavoriteLabel(name);

    expect(screen.queryByLabelText(favIconLabel)).toBeNull();
    screen.getByLabelText(notFavIconLabel);

    userEvent.click(favBtn);
    screen.getByLabelText(favIconLabel);
    expect(screen.queryByLabelText(notFavIconLabel)).toBeNull();
  });
});
