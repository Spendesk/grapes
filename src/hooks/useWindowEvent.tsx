import { useEffect, useRef } from 'react';

export function useWindowEvent<Type extends keyof WindowEventMap>(
  type: Type,
  listener: (event: WindowEventMap[Type]) => void,
  useCapture?: boolean,
) {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;

  useEffect(() => {
    function handler(event: WindowEventMap[Type]) {
      listenerRef.current(event);
    }

    window.addEventListener(type, handler, useCapture);
    return () => window.removeEventListener(type, handler, useCapture);
  }, [type, useCapture]);
}
