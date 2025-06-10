import { useCallback, useEffect, useReducer } from 'react';

type State = 'open' | 'closing' | 'close';
type Action = State | 'toggle';

function reducer(state: State, action: Action) {
  switch (action) {
    case 'open':
      return 'open';
    case 'closing':
      return state === 'close' ? 'close' : 'closing';
    case 'close':
      return 'close';
    case 'toggle':
      return state === 'open' ? 'closing' : 'open';
  }
}

export function useAnimationState(
  initialState: State,
  timeout = 200,
): [boolean, boolean, () => void, () => void, () => void] {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleState = useCallback(() => dispatch('toggle'), []);
  const open = useCallback(() => dispatch('open'), []);
  const close = useCallback(() => dispatch('closing'), []);

  useEffect(() => {
    let timeoutId = undefined;
    if (state === 'closing') {
      timeoutId = setTimeout(() => dispatch('close'), timeout);
    }
    return () => {
      clearInterval(timeoutId);
    };
  }, [timeout, state]);

  const isVisible = state !== 'close';

  return [isVisible, state === 'closing', open, close, toggleState];
}
