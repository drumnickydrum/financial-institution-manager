import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'setupTests';
import { VALID_ZIP_WITH_RESULTS } from 'test/inputs';
import { resultsText } from './Results';
import { FDIC_NEARBY_RETURN, FDIC_RESULTS_RETURN } from 'test/responses';
import {
  input,
  favBtn,
  getGoToSearchBtn,
  waitForResultsPage,
  getSubmitBtn,
} from 'test/helpers';

describe('Results Page', () => {
  beforeEach(async () => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
    render(<App />);

    input(VALID_ZIP_WITH_RESULTS);
    userEvent.click(getSubmitBtn());
    await waitForResultsPage();
  });

  afterEach(() => {
    userEvent.click(getGoToSearchBtn());
  });

  it('Displays results', async () => {
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
    expect(favBtn.getFavIcon()).toBeNull();
    expect(favBtn.getNotFavIcon()).toBeTruthy();

    userEvent.click(favBtn.getFavBtn());
    expect(favBtn.getFavIcon()).toBeTruthy();
    expect(favBtn.getNotFavIcon()).toBeNull();
  });
});
