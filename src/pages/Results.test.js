import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'test/setupTests';
import { searchFormText } from './Search';
import { input } from 'pages/Search.test';
import { VALID_ZIP_WITH_RESULTS } from 'test/inputs';
import { resultsText } from './Results';
import { FDIC_NEARBY_RETURN, FDIC_RESULTS_RETURN } from 'test/responses';

describe('Results Page', () => {
  let goBackBtn, nearbyBtn, debug;
  beforeEach(async () => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
    const app = render(<App />);
    debug = app.debug;

    const zipInput = screen.getByPlaceholderText(searchFormText.placeholder);
    const submitBtn = screen.getByText(searchFormText.submitBtn).closest('button');
    input(zipInput, VALID_ZIP_WITH_RESULTS);
    userEvent.click(submitBtn);

    const goBackBtnText = await screen.findByText((content) =>
      content.includes(resultsText.goBackBtn)
    );
    goBackBtn = goBackBtnText.closest('button');
    const nearbyBtnText = await screen.findByText((content) =>
      content.includes(resultsText.nearbyBtn)
    );
    nearbyBtn = nearbyBtnText.closest('button');
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
    userEvent.click(nearbyBtn);
    await screen.findAllByText(FDIC_NEARBY_RETURN[0].NAME);
    screen.getAllByText(FDIC_NEARBY_RETURN[1].NAME);
    screen.getAllByText(FDIC_NEARBY_RETURN[2].NAME);
  });
});
