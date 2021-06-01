import { useState, useEffect } from 'react';

export const getLS = (field) => JSON.parse(localStorage.getItem(field));
export const setLS = (field, value) => localStorage.setItem(field, JSON.stringify(value));

export const getSS = (field) => JSON.parse(sessionStorage.getItem(field));
export const setSS = (field, value) => sessionStorage.setItem(field, JSON.stringify(value));

export const useStateAndLS = (key, INITIAL_STATE) => {
  const [value, setValue] = useState(getLS(key) || INITIAL_STATE);
  useEffect(() => {
    setLS(key, value);
  }, [key, value]);
  return [value, setValue];
};
