import '@testing-library/jest-dom/extend-expect';
import {
  INVALID_ZIP,
  ZIP_REJECTS,
  FDIC_REJECTS,
  VALID_ZIP_WITH_RESULTS,
  VALID_ZIP_NO_RESULTS,
} from 'test/inputs';
import {
  FDIC_RESULTS_RETURN,
  FDIC_NO_RESULTS_RETURN,
  ZIP_VALID_RETURN,
} from 'test/responses';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'test/setupTests';
import { searchByZip } from './searchByZip';

describe('searchByZip()', () => {
  beforeEach(() => {
    ZIP_API_MOCK();
    FDIC_API_MOCK();
  });

  describe('zip api rejects', () => {
    let data;
    beforeEach(async () => {
      data = await searchByZip(ZIP_REJECTS);
    });

    it("doesn't throw an error", async () => {
      expect(data.errors.zip).toBeFalsy();
    });

    it('returns an empty array for zip results', () => {
      expect(data.results.zip).toEqual([]);
    });

    it('still returns fdic results', async () => {
      expect(data.results.fdic).toEqual(FDIC_RESULTS_RETURN);
    });
  });

  describe('FDIC api rejects', () => {
    it('returns an error', async () => {
      const data = await searchByZip(FDIC_REJECTS);
      expect(data.errors.fdic).toBeTruthy();
    });
  });

  describe('Invalid ZIP code', () => {
    it('returns an error for zip', async () => {
      const data = await searchByZip(INVALID_ZIP);
      expect(data.errors.zip).toBeTruthy();
    });
  });

  describe('Valid ZIP code', () => {
    it('returns results without errors', async () => {
      const data = await searchByZip(VALID_ZIP_WITH_RESULTS);
      expect(data.errors.zip).toBeFalsy();
      expect(data.errors.fdic).toBeFalsy();
      expect(data.results.zip).toEqual(ZIP_VALID_RETURN);
      expect(data.results.fdic).toEqual(FDIC_RESULTS_RETURN);
    });

    it('returns no results without errors', async () => {
      const data = await searchByZip(VALID_ZIP_NO_RESULTS);
      expect(data.errors.zip).toBeFalsy();
      expect(data.errors.fdic).toBeFalsy();
      expect(data.results.zip).toEqual(ZIP_VALID_RETURN);
      expect(data.results.fdic).toEqual(FDIC_NO_RESULTS_RETURN);
    });
  });
});
