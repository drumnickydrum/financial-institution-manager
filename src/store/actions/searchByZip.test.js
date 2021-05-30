import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import { FDIC_API, INSTITUTIONS_ENDPOINT, RADIUS_ENDPOINT, ZIPCODES_API } from 'network';
import {
  VALID_ZIP,
  INVALID_ZIP,
  ZIP_RESULTS,
  ZIP_NO_RESULTS,
  FDIC_RESULTS_RESPONSE,
  FDIC_NO_RESULTS_RESPONSE,
  FDIC_RESULTS_RETURN,
} from 'test/mock/mock';
import { searchByZip } from './searchByZip';

describe('searchByZip()', () => {
  describe('zip api rejects', () => {
    let data;
    beforeEach(async () => {
      ZIP_REJECTS();
      FDIC_FULFILLS_VALID();
      data = await searchByZip(VALID_ZIP);
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
    let data;
    beforeEach(async () => {
      ZIP_FULFILLS_VALID();
      FDIC_REJECTS();
      data = await searchByZip(VALID_ZIP);
    });

    it('returns an error', () => {
      expect(data.errors.fdic).toBeTruthy();
    });
  });

  describe('Invalid ZIP code', () => {
    let data;
    beforeEach(async () => {
      ZIP_FULFILLS_INVALID();
      FDIC_FULFILLS_INVALID();
      data = await searchByZip(INVALID_ZIP);
    });

    it('returns an error for zip', () => {
      expect(data.errors.zip).toBeTruthy();
    });
  });
});

/**
 *  Mock fetch responses
 */
const headers = { 'Access-Control-Allow-Origin': '*' };

function ZIP_FULFILLS_VALID() {
  nock(ZIPCODES_API).get(RADIUS_ENDPOINT(VALID_ZIP)).reply(200, ZIP_RESULTS, headers);
}
function ZIP_FULFILLS_INVALID() {
  nock(ZIPCODES_API).get(RADIUS_ENDPOINT(INVALID_ZIP)).reply(200, ZIP_NO_RESULTS, headers); // no 404 on invalid zip
}
function ZIP_REJECTS() {
  nock(ZIPCODES_API).get(RADIUS_ENDPOINT(VALID_ZIP)).reply(400, 'error', headers);
}

function FDIC_FULFILLS_VALID() {
  nock(FDIC_API)
    .get(INSTITUTIONS_ENDPOINT(VALID_ZIP))
    .reply(200, FDIC_RESULTS_RESPONSE, headers);
}
function FDIC_FULFILLS_INVALID() {
  nock(FDIC_API)
    .get(INSTITUTIONS_ENDPOINT(INVALID_ZIP))
    .reply(200, FDIC_NO_RESULTS_RESPONSE, headers); // no 404 if no results
}
function FDIC_REJECTS() {
  nock(FDIC_API).get(INSTITUTIONS_ENDPOINT(VALID_ZIP)).reply(400, 'error', headers);
}
