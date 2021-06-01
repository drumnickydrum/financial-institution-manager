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
} from './inputs';
import {
  FDIC_RESULTS_RESPONSE,
  FDIC_NO_RESULTS_RESPONSE,
  ZIP_VALID_RESPONSE,
  ZIP_INVALID_RESPONSE,
  ZIP_NO_NEARBY_RESPONSE,
} from './responses';

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
    .reply(200, ZIP_NO_NEARBY_RESPONSE, headers);

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
    .get((uri) => uri.includes(FDIC_REJECTS))
    .reply(500, 'error', headers)
    //
    .get((uri) => uri.includes(ZIP_REJECTS))
    .reply(200, FDIC_RESULTS_RESPONSE, headers)
    //
    .get((uri) => uri.includes(ZIP_NO_NEARBY))
    .reply(200, FDIC_NO_RESULTS_RESPONSE, headers);
