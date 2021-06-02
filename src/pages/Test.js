import { useStateAndCache } from 'hooks/useStateAndCache';

export const Test = () => {
  const [state, setState] = useStateAndCache('test', 'INITIAL STATE');
  // console.log(state);

  const updateState = () => {
    setState('UPDATED STATE');
  };

  return state === null ? null : (
    <div>
      <h1>Test Page</h1>
      <h4>{state}</h4>
      <button onClick={updateState}>Click to update</button>
    </div>
  );
};
