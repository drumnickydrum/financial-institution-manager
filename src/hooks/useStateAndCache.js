import { useState, useEffect } from 'react';
import { getCachedState, setCachedState } from 'utils/storage';
import { useIsMounted } from './useIsMounted';

export const useStateAndCache = (key, initialState) => {
  const isMountedRef = useIsMounted(); // for test env
  const [value, setValue] = useState(null);

  useEffect(() => {
    (async function () {
      const cachedState = await getCachedState(key);
      if (!isMountedRef.current) return; // for test env
      setValue(cachedState || initialState);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCachedState(key, value);
  }, [key, value]);
  return [value === null ? initialState : value, setValue];
};
