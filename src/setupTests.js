import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import { FDIC_API, ZIPCODES_API } from 'network';
import {
  ZIP_NO_NEARBY,
  INVALID_ZIP,
  VALID_ZIP_WITH_RESULTS,
  VALID_ZIP_NO_RESULTS,
  ZIP_REJECTS,
  FDIC_REJECTS,
  NEARBY_ZIP1,
  NEARBY_ZIP2,
} from './test/inputs';
import {
  FDIC_RESULTS_RESPONSE,
  FDIC_NO_RESULTS_RESPONSE,
  FDIC_NEARBY_RESPONSE,
  ZIP_VALID_RESPONSE,
  ZIP_INVALID_RESPONSE,
  ZIP_NO_NEARBY_RESPONSE,
  ZIP_NEARBY_RESPONSE,
} from './test/responses';
import FDBFactory from 'fake-indexeddb/build/FDBFactory';

jest.setTimeout(10000);

require('fake-indexeddb/auto');

export const resetIDB = () => (indexedDB = new FDBFactory());

nock.disableNetConnect(); // throw error if req on un-mocked url

const headers = { 'Access-Control-Allow-Origin': '*' };

export const ZIP_API_MOCK = () =>
  nock(ZIPCODES_API)
    .persist()
    //
    .get((uri) => uri.includes(VALID_ZIP_WITH_RESULTS))
    .reply(200, ZIP_VALID_RESPONSE, headers)
    //
    .get((uri) => uri.includes(VALID_ZIP_NO_RESULTS))
    .reply(200, ZIP_VALID_RESPONSE, headers)
    //
    .get((uri) => uri.includes(INVALID_ZIP))
    .reply(200, ZIP_INVALID_RESPONSE, headers) // no 404 on invalid zip
    //
    .get((uri) => uri.includes(ZIP_REJECTS))
    .reply(500, 'error', headers)
    //
    .get((uri) => uri.includes(FDIC_REJECTS))
    .reply(200, ZIP_VALID_RESPONSE, headers)
    //
    .get((uri) => uri.includes(ZIP_NO_NEARBY))
    .reply(200, ZIP_NO_NEARBY_RESPONSE, headers)
    //
    .get((uri) => uri.includes(NEARBY_ZIP1) || uri.includes(NEARBY_ZIP2))
    .reply(200, ZIP_NEARBY_RESPONSE, headers);

export const FDIC_API_MOCK = () =>
  nock(FDIC_API)
    .persist()
    .get((uri) => uri.includes(VALID_ZIP_WITH_RESULTS))
    .reply(200, FDIC_RESULTS_RESPONSE, headers)
    //
    .get((uri) => uri.includes(VALID_ZIP_NO_RESULTS))
    .reply(200, FDIC_NO_RESULTS_RESPONSE, headers)
    //
    .get((uri) => uri.includes(INVALID_ZIP))
    .reply(200, FDIC_NO_RESULTS_RESPONSE, headers) // no 404 if no results
    //
    .persist()
    .get((uri) => uri.includes(FDIC_REJECTS))
    .reply(500, 'rejected', headers)
    //
    .get((uri) => uri.includes(ZIP_REJECTS))
    .reply(200, FDIC_RESULTS_RESPONSE, headers)
    //
    .get((uri) => uri.includes(ZIP_NO_NEARBY))
    .reply(200, FDIC_NO_RESULTS_RESPONSE, headers)
    //
    .get((uri) => uri.includes(NEARBY_ZIP1) || uri.includes(NEARBY_ZIP2))
    .reply(200, FDIC_NEARBY_RESPONSE, headers);
