import { useState, useEffect } from 'react';
import { getCachedState, setCachedState } from 'utils/storage';

/**
 *  Since initial state is set asynchronously,
 *  check for `null` in component if you want to prevent flash
 */
export const useStateAndCache = (key, initialState) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    (async function () {
      const cachedState = await getCachedState(key);
      setValue(cachedState || initialState);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCachedState(key, value);
  }, [key, value]);
  return [value, setValue];
};
