import { retry, RETRY_DELAY } from './retry';

/**
 *  get/setCache get/setCachedState are proxies for however we will use storage.
 *  NOTE: localStorage is synchronous, most other methods will require async handling.
 *  So let's just return a Promise now so we can easily swap implementations.
 */
export const getCachedState = async (key) => getLS(key);
export const setCachedState = async (key, value) => setLS(key, value);
export const getCache = async (key) => getLS(key);
export const setCache = async (key, value) => setLS(key, value);

export const fetchCacheFirst = async (url) => {
  const cached = await getCache(url);
  if (cached) {
    // console.log(`cache return: ${url}`);
    return cached;
  } else
    return retry(() => fetch(url), RETRY_DELAY, 2)
      .then(async (res) => {
        const json = await res.json();
        setCache(url, json);
        // console.log(`fetch return: ${url}`);
        return json;
      })
      .catch((error) => ({ error }));
};

export const getLS = (key) => JSON.parse(localStorage.getItem(key));
export const setLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getSS = (key) => JSON.parse(sessionStorage.getItem(key));
export const setSS = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));
