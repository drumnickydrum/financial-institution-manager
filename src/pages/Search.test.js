import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {
  INVALID_ZIP,
  INVALID_ZIP_LENGTH,
  VALID_ZIP_WITH_RESULTS,
  VALID_ZIP_NO_RESULTS,
} from 'test/inputs';
import { searchFormText } from 'pages/Search';
import { resultsPendingText } from './ResultsPending';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'test/setupTests';

describe('Search Page', () => {
  let zipInput, submitBtn, debug;
  beforeEach(() => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
    const app = render(<App />);
    debug = app.debug;

    zipInput = screen.getByPlaceholderText(searchFormText.placeholder);
    submitBtn = screen.getByText(searchFormText.submitBtn).closest('button');
  });

  it('Verify test inputs', () => {
    expect(zipInput.value).toBeFalsy();
    verifyInput(zipInput, INVALID_ZIP_LENGTH);
    verifyInput(zipInput, INVALID_ZIP);
    verifyInput(zipInput, VALID_ZIP_WITH_RESULTS);
    verifyInput(zipInput, VALID_ZIP_NO_RESULTS);
  });

  it('Presents error message if invalid zip length', () => {
    input(zipInput, INVALID_ZIP_LENGTH);
    userEvent.click(submitBtn);
    screen.getByText(searchFormText.errors.length);
  });

  it('Presents error message after search for invalid zip code', async () => {
    input(zipInput, INVALID_ZIP);
    userEvent.click(submitBtn);
    await screen.findByText((content) => content.match(searchFormText.errors.invalid));
  });

  it('Provides nearby search option if no results', async () => {
    input(zipInput, VALID_ZIP_NO_RESULTS);
    userEvent.click(submitBtn);
    await screen.findByText((content) => content.match(searchFormText.noResults));
    await screen.findByText((content) => content.match(searchFormText.nearbyBtn));
  });

  it('Displays loading screen during search', () => {
    input(zipInput, VALID_ZIP_WITH_RESULTS);
    userEvent.click(submitBtn);
    expect(zipInput).not.toBeInTheDocument();
    screen.getByText(resultsPendingText);
  });
});

const verifyInput = (zipInput, userInput) => {
  input(zipInput, userInput);
  expect(zipInput).toHaveValue(userInput);
};

const input = (zipInput, userInput) => {
  fireEvent.change(zipInput, {
    target: { value: String(userInput) },
  });
};
