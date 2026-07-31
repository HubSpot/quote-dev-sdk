import { useCallback, useEffect, useState } from 'react';
import {
  ControlState,
  DisableOptions,
  FeatureControl,
  QuoteFeature,
} from '../types/api';
import {
  getControlEventName,
  readControl,
  writeControl,
} from '../events/window';

interface UseFeatureControlOptions {
  canDisable?: () => boolean;
}

export const useFeatureControl = (
  feature: QuoteFeature,
  options?: UseFeatureControlOptions
): FeatureControl => {
  const eventName = getControlEventName(feature);

  const [state, setState] = useState<ControlState>(() => readControl(feature));

  useEffect(() => {
    if (typeof window === 'undefined' || !eventName) return;

    setState(readControl(feature));

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ControlState>).detail;
      if (!detail) return;
      setState(detail);
    };

    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [eventName, feature]);

  const canDisableFn = options?.canDisable;

  const disable = useCallback(
    (disableOptions?: DisableOptions): ControlState => {
      if (canDisableFn && !canDisableFn()) {
        console.warn(
          `[hs-quote] Cannot disable "${feature}" in its current state.`
        );
        return readControl(feature);
      }
      const next: ControlState = {
        disabled: true,
        reason: disableOptions?.reason ?? null,
      };
      writeControl(feature, next);
      return next;
    },
    [feature, canDisableFn]
  );

  const enable = useCallback((): ControlState => {
    const next: ControlState = { disabled: false, reason: null };
    writeControl(feature, next);
    return next;
  }, [feature]);

  return {
    isDisabled: state.disabled,
    disabledReason: state.reason,
    disable,
    enable,
  };
};
