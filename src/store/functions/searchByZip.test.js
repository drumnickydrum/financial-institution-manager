import '@testing-library/jest-dom/extend-expect';
import {
  INVALID_ZIP,
  ZIP_REJECTS,
  FDIC_REJECTS,
  VALID_ZIP_WITH_RESULTS,
  VALID_ZIP_NO_RESULTS,
  ALL_ZIPS_REJECT,
  MULTIPLE_ZIPS,
  ALL_ZIPS_NO_RESULTS,
  ZIP_NO_NEARBY,
} from 'test/inputs';
import {
  FDIC_RESULTS_RETURN,
  FDIC_NO_RESULTS_RETURN,
  ZIP_VALID_RETURN,
} from 'test/responses';
import { FDIC_API_MOCK, ZIP_API_MOCK } from 'setupTests';
import { searchByZip, searchByZipMultiple } from './searchByZip';

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

  describe('ZIP with no results and none nearby', () => {
    it('returns empty with no errors', async () => {
      const data = await searchByZip(ZIP_NO_NEARBY);
      expect(data.errors.zip).toBeFalsy();
      expect(data.errors.fdic).toBeFalsy();
      expect(data.results.zip).toEqual([]);
      expect(data.results.fdic).toEqual([]);
    });
  });
});

describe('searchByZipMultiple()', () => {
  beforeEach(FDIC_API_MOCK);
  it('returns an error if all reject', async () => {
    const data = await searchByZipMultiple(ALL_ZIPS_REJECT);
    expect(data.error).toBeTruthy();
    expect(data.results).toEqual([]);
  });

  it('returns an empty array if no results from all', async () => {
    const data = await searchByZipMultiple(ALL_ZIPS_NO_RESULTS);
    expect(data.error).toBeFalsy();
    expect(data.results).toEqual([]);
  });

  it('returns an array of results even if some reject', async () => {
    const data = await searchByZipMultiple(MULTIPLE_ZIPS);
    expect(data.error).toBeFalsy();
    expect(data.results.length).toBeGreaterThan(0);
  });
});
