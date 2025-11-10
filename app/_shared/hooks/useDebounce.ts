'use client';

import { useCallback, useRef } from 'react';

function useDebounce(callback: () => void | Promise<void>, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      void callback();
    }, delay);
  }, [callback, delay]);
}

export default useDebounce;
