import { useEffect } from 'react';
import { useState } from 'react';

export const useIsInitial = () => {
  const [isInitial, setIsInitial] = useState(true);
  useEffect(() => {
    setIsInitial(false);
  }, []);
  return isInitial;
};
