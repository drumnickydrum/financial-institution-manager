import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { INVALID_ZIP_LENGTH } from './test/mock/mock';
import { searchFormText } from 'pages/Search';

describe('Financial Institutions Search', () => {
  let queryByText, zipInput, submitBtn;
  beforeEach(() => {
    const queries = render(<App />);
    const getByText = queries.getByText;
    const getByPlaceholderText = queries.getByPlaceholderText;
    queryByText = queries.queryByText;

    zipInput = getByPlaceholderText(searchFormText.placeholder);
    submitBtn = getByText(searchFormText.submitBtn).closest('button');
  });

  it('Invalid zip length presents error message', () => {
    expect(zipInput.value).toBeFalsy();

    fireEvent.change(zipInput, {
      target: { value: String(INVALID_ZIP_LENGTH) },
    });
    expect(zipInput).toHaveValue(INVALID_ZIP_LENGTH);

    userEvent.click(submitBtn);
    expect(queryByText(searchFormText.errors.length)).not.toBeNull();
  });
});
