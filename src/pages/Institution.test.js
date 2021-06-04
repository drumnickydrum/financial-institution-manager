import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { PATHS } from 'store/GoToProvider';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'setupTests';
import {
  getNotesCancelBtn,
  getNotesEditBtn,
  getNotesSaveBtn,
  getSubmitBtn,
  input,
  queryNotesTextArea,
} from 'test/helpers';
import { VALID_ZIP_WITH_RESULTS } from 'test/inputs';
import { FDIC_RESULTS_RETURN } from 'test/responses';
import {
  debug,
  favBtn,
  getGoBackBtn,
  getGoToSearchBtn,
  waitForResultsPage,
  getNotes,
} from 'test/helpers';

const fi = FDIC_RESULTS_RETURN[0];

describe('Institution Page', () => {
  let fiItem;
  beforeEach(async () => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
    render(<App />);

    input(VALID_ZIP_WITH_RESULTS);
    userEvent.click(getSubmitBtn());
    await waitForResultsPage();

    fiItem = screen.getByText(fi.NAME);
    userEvent.click(fiItem);
  });

  afterEach(() => {
    userEvent.click(getGoToSearchBtn());
  });

  it('Renders financial institution information', () => {
    screen.getByText(fi.NAME);
    screen.getByText(fi.ADDRESS);
  });

  describe('Editing notes', () => {
    it('Notes are readonly until edit enabled', () => {
      getNotes();
      expect(queryNotesTextArea()).toBeNull();
    });

    it('Edit/Save/Cancel notes textarea', async () => {
      userEvent.click(getNotesEditBtn());
      userEvent.type(queryNotesTextArea(), 'first');
      userEvent.click(getNotesSaveBtn());
      expect(getNotes()).toHaveTextContent('first');

      userEvent.type(getNotes(), '+second');
      expect(getNotes()).toHaveTextContent('first');

      userEvent.click(getNotesEditBtn());
      userEvent.type(queryNotesTextArea(), '+second');
      userEvent.click(getNotesCancelBtn());
      expect(getNotes()).toHaveTextContent('first');

      userEvent.click(getNotesEditBtn());
      userEvent.type(queryNotesTextArea(), '+second');
      userEvent.click(getNotesSaveBtn());
      expect(getNotes()).toHaveTextContent('first+second');
    });

    it('Remembers notes after re-mount', async () => {
      const notesInitial = getNotes().innerHTML;
      userEvent.click(getNotesEditBtn());
      userEvent.type(queryNotesTextArea(), '+saved');
      userEvent.click(getNotesSaveBtn());
      const savedValue = `${notesInitial}+saved`;

      expect(getNotes()).toHaveTextContent(savedValue);
      expect(window.location.pathname.match(/institution/)[0]).toBeTruthy();
      userEvent.click(getGoBackBtn());
      expect(window.location.pathname.match(/results/)[0]).toBeTruthy();
      fiItem = screen.getByText(fi.NAME);
      userEvent.click(fiItem);

      expect(getNotes()).toHaveTextContent(savedValue);
    });

    it('Favorite property persists between search & results pages', () => {
      expect(favBtn.getFavIcon()).toBeNull();
      expect(favBtn.getNotFavIcon()).toBeTruthy();

      userEvent.click(favBtn.getFavTextBtn(false)); // getFavTextBtn on Inst page
      expect(favBtn.getFavIcon()).toBeTruthy();
      expect(favBtn.getNotFavIcon()).toBeNull();

      userEvent.click(getGoBackBtn());
      expect(window.location.pathname).toBe(PATHS.RESULTS);
      expect(favBtn.getFavIcon()).toBeTruthy();
      expect(favBtn.getNotFavIcon()).toBeNull();

      userEvent.click(favBtn.getFavBtn(true)); // getFavBtn on Results page
      expect(favBtn.getFavIcon()).toBeNull();
      expect(favBtn.getNotFavIcon()).toBeTruthy();
      fiItem = screen.getByText(fi.NAME);

      userEvent.click(fiItem);
      expect(window.location.pathname).toBe(PATHS.INSTITUTION + fi.ID);
      expect(favBtn.getFavIcon()).toBeNull();
      expect(favBtn.getNotFavIcon()).toBeTruthy();
    });
  });
});
