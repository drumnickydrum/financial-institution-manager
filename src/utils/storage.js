import { retry, RETRY_DELAY } from './retry';
import { get, set } from 'idb-keyval';

export const getCachedState = (key) => get(key);
export const setCachedState = (key, value) => set(key, value);
export const getCache = (key) => get(key);
export const setCache = (key, value) => set(key, value);

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
