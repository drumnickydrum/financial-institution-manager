import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import {
  INVALID_ZIP,
  INVALID_ZIP_LENGTH,
  VALID_ZIP_WITH_RESULTS,
  VALID_ZIP_NO_RESULTS,
  ZIP_NO_NEARBY,
  FDIC_REJECTS,
  ZIP_REJECTS,
} from 'test/inputs';
import { searchFormText } from 'pages/Search/Search';
import { resultsPendingText } from './ResultsPending';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'setupTests';
import {
  getSubmitBtn,
  queryZipInput,
  getZipInput,
  input,
  getGoToSearchBtn,
  debug,
  waitForResultsPage,
} from 'test/helpers';
import { FDIC_NEARBY_RETURN } from 'test/responses';

describe('Search Page', () => {
  beforeEach(async () => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
    render(<App />);
    userEvent.click(getGoToSearchBtn());
  });

  it('Verify test inputs', () => {
    expect(getZipInput().value).toBeFalsy();
    verifyInput(INVALID_ZIP_LENGTH);
    verifyInput(INVALID_ZIP);
    verifyInput(VALID_ZIP_WITH_RESULTS);
    verifyInput(VALID_ZIP_NO_RESULTS);
  });

  it('Presents error message if invalid zip length', () => {
    input(INVALID_ZIP_LENGTH);
    userEvent.click(getSubmitBtn());
    screen.getByText(searchFormText.errors.length);
  });

  it('Presents error message after search for invalid zip code', async () => {
    input(INVALID_ZIP);
    userEvent.click(getSubmitBtn());
    await screen.findByText((content) => content.match(searchFormText.errors.invalid));
  });

  it('Ignores zip rejection if FDIC returns results', async () => {
    input(ZIP_REJECTS);
    userEvent.click(getSubmitBtn());
    await waitForResultsPage();
  });

  it('Presents error if FDIC rejects', async () => {
    input(FDIC_REJECTS);
    userEvent.click(getSubmitBtn());
    await screen.findByText((content) => content.match(searchFormText.errors.network));
  });

  it('Provides nearby search option if available', async () => {
    input(VALID_ZIP_NO_RESULTS);
    userEvent.click(getSubmitBtn());
    await screen.findByText((content) => content.match(searchFormText.noResults));
    screen.getByText(searchFormText.nearbyBtn);
  });

  it("Doesn't provide nearby search option if unavailable", async () => {
    input(ZIP_NO_NEARBY);
    userEvent.click(getSubmitBtn());
    await screen.findByText((content) => content.match(searchFormText.noResults));
    expect(screen.queryByText(searchFormText.nearbyBtn)).toBeNull();
  });

  it('Displays loading screen during search', async () => {
    input(VALID_ZIP_WITH_RESULTS);
    userEvent.click(getSubmitBtn());
    expect(queryZipInput()).toBeNull();
    screen.getByText(resultsPendingText);
    await waitForResultsPage();
  });

  it('Executes search on nearby zip codes', async () => {
    input(VALID_ZIP_NO_RESULTS);
    userEvent.click(getSubmitBtn());
    await screen.findByText((content) => content.match(searchFormText.noResults));
    userEvent.click(screen.getByText(searchFormText.nearbyBtn));
    await screen.findAllByText(FDIC_NEARBY_RETURN[0].NAME); // dup results only in test from same response object
  });
});

const verifyInput = (userInput) => {
  input(userInput);
  expect(getZipInput()).toHaveValue(userInput);
};
