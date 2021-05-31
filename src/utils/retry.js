import { wait } from './wait';

export const RETRY_DELAY = 0;

export const retry = (func, delay, max) =>
  new Promise((res, rej) => {
    async function tryFunc(count = 0) {
      try {
        const promise = await func();
        if (!promise.ok) throw new Error(promise.statusText);
        res(promise);
      } catch (error) {
        if (count > max) rej(error);
        await wait(delay);
        tryFunc(count + 1);
      }
    }
    tryFunc();
  });
