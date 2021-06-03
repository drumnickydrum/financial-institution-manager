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
import { institutionText } from './Institution';

const debug = (chars) => screen.debug(document.body, chars);

const fi = FDIC_RESULTS_RETURN[0];

describe('Institution Page', () => {
  let goBackToSearch, goBackToResults, fiItem;
  beforeEach(async () => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
    render(<App />);

    const zipInput = await screen.findByPlaceholderText(searchFormText.placeholder);
    const submitBtn = screen.getByText(searchFormText.submitBtn).closest('button');
    input(zipInput, VALID_ZIP_WITH_RESULTS);
    userEvent.click(submitBtn);
    goBackToSearch = await screen.findByText((content) =>
      content.includes(resultsText.goBackBtn)
    );
    goBackToSearch = goBackToSearch.closest('button');
    fiItem = screen.getByText(fi.NAME);
    userEvent.click(fiItem);
    goBackToResults = screen.getByText(institutionText.goBackBtn).closest('button');
  });

  afterEach(() => {
    userEvent.click(goBackToResults);
    goBackToSearch = screen.getByText(resultsText.goBackBtn).closest('button');
    userEvent.click(goBackToSearch);
  });

  it('Renders financial institution information', () => {
    screen.getByText(fi.NAME);
    screen.getByText(fi.ADDRESS);
  });

  describe('Editing notes', () => {
    const getNotesTextArea = () => {
      return screen.getByLabelText(institutionText.notesLabel);
    };
    let notesTextArea;
    const editBtn = () => screen.getByText(institutionText.editNotesBtn);
    const saveBtn = () => screen.getByText(institutionText.saveNotesBtn);
    const cancelBtn = () => screen.getByText(institutionText.cancelEditsBtn);
    beforeEach(() => {
      notesTextArea = getNotesTextArea();
    });

    it('Notes are readonly until edit enabled', () => {
      expect(notesTextArea).toHaveValue('');
      userEvent.type(notesTextArea, 'asdf');
      expect(notesTextArea).toHaveValue('');
    });

    it('Edit/Save/Cancel notes textarea', () => {
      userEvent.click(editBtn());
      userEvent.type(notesTextArea, 'first');
      userEvent.click(saveBtn());
      expect(notesTextArea).toHaveValue('first');
      userEvent.type(notesTextArea, '+second');
      expect(notesTextArea).toHaveValue('first');
      userEvent.click(editBtn());
      userEvent.type(notesTextArea, '+second');
      userEvent.click(cancelBtn());
      expect(notesTextArea).toHaveValue('first');
      userEvent.click(editBtn());
      userEvent.type(notesTextArea, '+second');
      userEvent.click(saveBtn());
      expect(notesTextArea).toHaveValue('first+second');
    });

    it('Remembers notes after re-mount', () => {
      const notesInitial = notesTextArea.value;
      userEvent.click(editBtn());
      userEvent.type(notesTextArea, '+saved');
      userEvent.click(saveBtn());
      const savedValue = `${notesInitial}+saved`;
      expect(notesTextArea).toHaveValue(savedValue);
      userEvent.click(goBackToResults);
      expect(window.location.pathname.match(/results/)[0]).toBeTruthy();
      fiItem = screen.getByText(fi.NAME);
      userEvent.click(fiItem);
      notesTextArea = getNotesTextArea();
      expect(notesTextArea).toHaveValue(savedValue);
    });
  });
});
