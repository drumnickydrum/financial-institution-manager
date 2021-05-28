export const ZIPCODES_API = 'https://app.zipcodebase.com/api/v1';
export const RADIUS_ENDPOINT = (zip) => `/radius?code=${zip}&radius=5&country=US&unit=miles`;

export const FDIC_API = 'https://banks.data.fdic.gov/api';
export const INSTITUTIONS_ENDPOINT = (zip) => `/institutions?filters=ZIP%3A%22${zip}%22`;
