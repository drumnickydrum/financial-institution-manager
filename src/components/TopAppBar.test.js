import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { PATHS } from 'store/GoToProvider';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'setupTests';
import { input } from 'test/helpers';
import { VALID_ZIP_WITH_RESULTS } from 'test/inputs';
import {
  getFiItem,
  getGoBackBtn,
  getGoToFavoritesBtn,
  getGoToSearchBtn,
  getSubmitBtn,
  waitForResultsPage,
} from 'test/helpers';

describe('TopAppBar', () => {
  beforeEach(() => {
    FDIC_API_MOCK();
    ZIP_API_MOCK();
    render(<App />);
  });

  it('Navigates', async () => {
    userEvent.click(getGoToFavoritesBtn());
    expect(window.location.pathname).toBe(PATHS.FAVORITES);
    userEvent.click(getGoBackBtn());
    expect(window.location.pathname).toBe(PATHS.SEARCH);

    input(VALID_ZIP_WITH_RESULTS);
    userEvent.click(getSubmitBtn());
    await waitForResultsPage();
    expect(window.location.pathname).toBe(PATHS.RESULTS);

    userEvent.click(getFiItem());
    expect(window.location.pathname.includes(PATHS.INSTITUTION)).toBeTruthy();

    userEvent.click(getGoBackBtn());
    expect(window.location.pathname).toBe(PATHS.RESULTS);

    userEvent.click(getFiItem());
    expect(window.location.pathname.includes(PATHS.INSTITUTION)).toBeTruthy();
    userEvent.click(getGoToSearchBtn());
    expect(window.location.pathname.includes(PATHS.SEARCH)).toBeTruthy();
  });
});
