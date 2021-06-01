import { fetchFDIC, fetchZIP } from 'network';

export const searchByZip = async (zip) => {
  const payload = {
    results: { zip: [], fdic: [] },
    errors: { zip: '', fdic: '' },
  };
  try {
    const promises = [fetchZIP(zip), fetchFDIC(zip)];
    const [zipRes, fdicRes] = await Promise.allSettled(promises);

    if (fdicRes.value.error) throw new Error('fdic rejected');
    payload.results.fdic = fdicRes.value.data;
    if (!zipRes.value.error) {
      if (zipRes.value.results.error) throw new Error('invalid zip');
      payload.results.zip = zipRes.value.results.splice(1).map((result, i) => result.code); // omit zipSearched
    }
  } catch (e) {
    if (e.message.match(/fdic/)) {
      if (e.message.match(/rejected/)) payload.errors.fdic = 'rejected';
    }
    if (e.message.match(/zip/)) {
      if (e.message.match(/invalid/)) payload.errors.zip = 'invalid';
    }
  } finally {
    return payload;
  }
};

export const searchByZipMultiple = async (zips) => {
  const NUM_ZIPS = zips.length;
  const payload = {
    results: [],
    error: '',
  };

  try {
    const promises = [];
    for (let zip of zips) promises.push(fetchFDIC(zip));
    const results = await Promise.allSettled(promises);
    let rejected = 0;
    let noResults = 0;
    for (let result of results) {
      const error = result.value.error;
      if (error) rejected++;
      else {
        if (result.value.data.length === 0) noResults++;
        payload.results.push(...result.value.data);
      }
    }
    if (rejected === NUM_ZIPS) throw new Error('fdic rejected');
    if (noResults === NUM_ZIPS) throw new Error('no results');
  } catch (e) {
    if (e.message.match(/rejected/)) payload.error = 'rejected';
    if (e.message.match(/results/)) payload.error = 'no results';
  } finally {
    return payload;
  }
};
