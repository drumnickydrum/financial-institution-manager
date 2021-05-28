import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import App from '../App';
import { FDIC_API, INSTITUTIONS_ENDPOINT, RADIUS_ENDPOINT, ZIPCODES_API } from '../network';
import {
  VALID_ZIP,
  INVALID_ZIP,
  ZIP_RESULTS,
  ZIP_NO_RESULTS,
  FDIC_RESULTS,
  FDIC_NO_RESULTS,
  INVALID_ZIP_LENGTH,
} from './mock/mock';
import { searchFormText } from '../Search';

describe('Financial Institutions Search', () => {
  beforeAll(() => {
    nock(ZIPCODES_API)
      .persist()
      .get(RADIUS_ENDPOINT(INVALID_ZIP))
      .reply(200, ZIP_NO_RESULTS) // api: no 404 on invalid zip
      .get(RADIUS_ENDPOINT(VALID_ZIP))
      .reply(200, ZIP_RESULTS);

    nock(FDIC_API)
      .persist()
      .get(INSTITUTIONS_ENDPOINT(INVALID_ZIP))
      .reply(200, FDIC_NO_RESULTS) // api: no 404 if no results
      .get(INSTITUTIONS_ENDPOINT(VALID_ZIP))
      .reply(200, FDIC_RESULTS);
  });

  afterEach(cleanup);

  describe('when user tries to submit a zip with invalid length', () => {
    it('user is presented with an error message', () => {
      const { getByText, getByPlaceholderText, queryByText } = render(<App />);
      userEvent.type(
        getByPlaceholderText(searchFormText.placeholder),
        String(INVALID_ZIP_LENGTH)
      );
      expect(getByPlaceholderText(searchFormText.placeholder)).toHaveAttribute(
        'value',
        String(INVALID_ZIP_LENGTH)
      );
      userEvent.click(getByText(searchFormText.submitBtn).closest('button'));
      expect(queryByText(searchFormText.errors.length)).not.toBeNull();
    });
  });

  // describe('when user submits a valid zip code', () => {
  //   it('submits', async () => {
  //     const { getByText, getByPlaceholderText } = render(<App />);
  //     userEvent.type(getByPlaceholderText(searchFormText.placeholder), String(VALID_ZIP));
  //     expect(getByPlaceholderText(searchFormText.placeholder)).toHaveAttribute(
  //       'value',
  //       String(VALID_ZIP)
  //     );
  //     userEvent.click(getByText(searchFormText.submitBtn).closest('button'));
  //   });
  // });

  // describe('when user submits an invalid zip code', () => {
  //   it('user is presented with an error message', async () => {
  //     const { getByText, getByPlaceholderText, queryByText } = render(<App />);
  //     userEvent.type(getByPlaceholderText(searchFormText.placeholder), INVALID_ZIP);
  //     expect(getByPlaceholderText(searchFormText.placeholder)).toHaveAttribute(
  //       'value',
  //       INVALID_ZIP
  //     );
  //     userEvent.click(getByText(searchFormText.submitBtn).closest('button'));

  //   });
  // });
});
