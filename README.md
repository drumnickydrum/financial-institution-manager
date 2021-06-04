# Financial Institution Manager

[F.I. Manager](https://fi-manager.netlify.app) is a simple SPA that allows a user to search for U.S. financial institutions by ZIP code. It is built with [React](https://reactjs.org/docs/getting-started.html) and styled with [Material-UI](https://material-ui.com/getting-started/installation/). The user can 'favorite' and add notes to institutions, which persists across page loads and app refresh/reload.

## Installation

To install: `npm install`

To launch: `npm start` (site will be live on http://localhost:3000)

To test (with coverage) `npm test`

(To add options to npm scripts, see `package.json` in `/src`)

## Testing

The testing is mostly behavioral and built using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Each test renders the app _in full_, then executes user actions related to the current component.

Here is an example of a `beforeEach` arrangment that first executes a search, then selects one of the results to navigate to it's info page:

```javascript
beforeEach(async () => {
  ZIP_API_MOCK();
  FDIC_API_MOCK();
  render(<App />);

  input(VALID_ZIP_WITH_RESULTS);
  userEvent.click(getSubmitBtn());
  await waitForResultsPage();

  fiItem = screen.getByText(fi.NAME);
  userEvent.click(fiItem); // Should redirect to info page
});
```

Follow up tests assert we've arrived where we want to (testing integration):

```javascript
it('Renders financial institution information', () => {
  screen.getByText(fi.NAME);
  screen.getByText(fi.ADDRESS);
});
```

And that we can interact correctly (testing this component):

```javascript
it('Edit/Save/Cancel notes textarea', async () => {
  userEvent.click(getNotesEditBtn()); // editing now enabled
  userEvent.type(queryNotesTextArea(), 'first');
  userEvent.click(getNotesSaveBtn()); // editing now disabled
  expect(getNotes()).toHaveTextContent('first');

  userEvent.type(getNotes(), '+second');
  expect(getNotes()).toHaveTextContent('first');

  userEvent.click(getNotesEditBtn()); // editing enabled again
  userEvent.type(queryNotesTextArea(), '+second');
  userEvent.click(getNotesCancelBtn());
  expect(getNotes()).toHaveTextContent('first');

  userEvent.click(getNotesEditBtn());
  userEvent.type(queryNotesTextArea(), '+second');
  userEvent.click(getNotesSaveBtn());
  expect(getNotes()).toHaveTextContent('first+second');
});
```

👍: This strategy accounts for near-100% test coverage, and replicates all user interactions with the app.

👎: This was a time-sensitive design and has not been optimized. For instance, the full API mocks don't need to be called before each test; only the specific endpoints need to be mocked with each test that requires it. It would also be wise to have smaller unit tests for components that should stand on their own.

## Design

### Scope

The scope was kept small to build a solid mvp. Currently, the user can only search by ZIP code, and this is obviously insufficient. It did however allow design of the app to be much simpler.

👍: To allow a better collection of results, the search hits a ZIP code API to find nearby locations. This provides additional search results should the user's first choice come up null. (If you plan on stress testing the app, you may wipe out my free subscription to this API, so give me a heads up.)

👎: The (beta) FDIC API data is a bit wonky and major institutions are missing from many ZIP codes. For the purposes of this exercise, the results are sufficient.

### State Management

Because this was a time-sensitive design, I decided to use only React Context instead of a more robust state management solution. Actions and values are kept in `src/store` and are shared between any components which require them.

### Caching / Storage

I provided proxy functions for caching in `utils/storage` that are currently using a simple IndexedDB solution. This should allow us to swap in another implementation without having to redesign anything where cached values are consumed.

## UX

To avoid complexity, the user is guided through the process with minimal screens. There are very few inputs at any given time, and a navigation toolbar is always available for the two most important pages: Search and Favorites.

👍: The user experience is simple and smooth.

👎: Again due to time-sensitivity, many HTML semantics are missing. For completeness, I would probably also add some hover-over tooltips.
