import { retry, RETRY_DELAY } from 'utils/retry';

/**
 *  ZIP Code API
 */
export const ZIPCODES_API = 'https://app.zipcodebase.com/api/v1';
const ZIP_KEY = '9598a1b0-bffc-11eb-8afc-c7b7fba36d84'; // this is a prototype app with no backend, pls excuse and don't steal :)
export const RADIUS_ENDPOINT = (zip) =>
  `/radius?apikey=${ZIP_KEY}&code=${zip}&radius=5&country=US&unit=miles`;
export const ZIPCODES_URL = (zip) => `${ZIPCODES_API}${RADIUS_ENDPOINT(zip)}`;

export const fetchZIP = (zip) =>
  retry(() => fetch(ZIPCODES_URL(zip)), RETRY_DELAY, 2)
    .then((res) => res.json())
    .catch((error) => ({ error }));

/**
 *  FDIC API
 */
export const FDIC_API = 'https://banks.data.fdic.gov/api';
export const INSTITUTIONS_ENDPOINT = (zip) => `/institutions?filters=ZIP%3A%22${zip}%22`;
export const FDIC_URL = (zip) => `${FDIC_API}${INSTITUTIONS_ENDPOINT(zip)}`;

export const fetchFDIC = (zip) =>
  retry(() => fetch(FDIC_URL(zip)), RETRY_DELAY, 2)
    .then((res) => res.json())
    .catch((error) => ({ error }));
