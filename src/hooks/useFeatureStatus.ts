import { useEffect, useState } from 'react';
import { QuoteFeature, QuoteHookResult } from '../types/api';
import { getStateEventName, readEventCache } from '../events/window';

const INITIAL = {
  loading: true,
  error: false,
  data: null,
} as const;

export const useFeatureStatus = <T>(
  feature: QuoteFeature
): QuoteHookResult<T> => {
  const eventName = getStateEventName(feature);

  const [state, setState] = useState<QuoteHookResult<T>>(
    () => readEventCache<QuoteHookResult<T>>(eventName) ?? INITIAL
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !eventName) return;

    const latest = readEventCache<QuoteHookResult<T>>(eventName);
    if (latest) setState(latest);

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<QuoteHookResult<T>>).detail;
      if (!detail) return;
      setState(detail);
    };

    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [eventName]);

  return state;
};
