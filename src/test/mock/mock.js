export const VALID_ZIP = 90210;
export const INVALID_ZIP = 99999;
export const INVALID_ZIP_LENGTH = 9999;

export const ZIP_NO_RESULTS = {
  query: {
    code: '99999',
    unit: 'miles',
    radius: '5',
    country: 'US',
  },
  results: {
    error: 'postalcode  could not be found',
  },
};

export const ZIP_RESULTS = {
  query: {
    code: '90210',
    unit: 'miles',
    radius: '5',
    country: 'US',
  },
  results: [
    {
      code: '90210',
      city: 'Beverly Hills',
      state: 'CA',
      city_en: null,
      state_en: null,
      distance: 0,
    },
    {
      code: '90209',
      city: 'Beverly Hills',
      state: 'CA',
      city_en: null,
      state_en: null,
      distance: 1.19,
    },
    {
      code: '90213',
      city: 'Beverly Hills',
      state: 'CA',
      city_en: null,
      state_en: null,
      distance: 1.19,
    },
    {
      code: '90069',
      city: 'West Hollywood',
      state: 'CA',
      city_en: null,
      state_en: null,
      distance: 1.59,
    },
  ],
};

export const FDIC_NO_RESULTS = {
  meta: {
    total: 0,
    parameters: {
      filters: 'ZIP:"99999"',
    },
    index: {
      name: 'institutions_1622038113126',
      createTimestamp: '2021-05-26T14:28:01Z',
    },
  },
  data: [],
  totals: {
    count: 0,
  },
};

export const FDIC_RESULTS = {
  meta: {
    total: 3,
    parameters: {
      filters: 'ZIP:"90210"',
    },
    index: {
      name: 'institutions_1622038113126',
      createTimestamp: '2021-05-26T14:28:01Z',
    },
  },
  data: [
    {
      data: {
        ZIP: '90210',
        STALP: 'CA',
        REGAGNT: 'FDIC',
        CITY: 'Beverly Hills',
        BKCLASS: 'NM',
        COUNTY: 'Los Angeles',
        NAME: 'Ahmanson Bank and Trust Company',
        ADDRESS: '9145 Wilshire Boulevard',
        LATITUDE: 34.067196,
        LONGITUDE: -118.39118,
        ESTYMD: '11/25/1957',
        ID: '17814',
      },
      score: 0,
    },
    {
      data: {
        ZIP: '90210',
        STALP: 'CA',
        REGAGNT: 'FDIC',
        CITY: 'Beverly Hills',
        BKCLASS: 'NM',
        COUNTY: 'Los Angeles',
        NAME: 'Century Bank',
        ADDRESS: '9145 Wilshire Boulevard',
        LATITUDE: 34.067382,
        LONGITUDE: -118.391584,
        ESTYMD: '08/06/1964',
        ID: '19198',
      },
      score: 0,
    },
    {
      data: {
        ZIP: '90210',
        STALP: 'CA',
        REGAGNT: 'FDIC',
        CITY: 'Beverly Hills',
        BKCLASS: 'NM',
        COUNTY: 'Los Angeles',
        NAME: 'First Pacific Bank',
        ADDRESS: '469 North Canon Drive',
        LATITUDE: 34.071804,
        LONGITUDE: -118.402178,
        ESTYMD: '09/28/1972',
        ID: '20816',
      },
      score: 0,
    },
  ],
  totals: {
    count: 3,
  },
};
