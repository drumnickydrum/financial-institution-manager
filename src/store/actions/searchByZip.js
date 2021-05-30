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
      payload.results.zip = zipRes.value.results;
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
