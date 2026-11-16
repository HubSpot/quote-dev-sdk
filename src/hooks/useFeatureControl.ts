import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  const [disabled, setDisabled] = useState(() => readControl(feature).disabled);
  const [reason, setReason] = useState(() => readControl(feature).reason);

  useEffect(() => {
    if (typeof window === 'undefined' || !eventName) return;

    const current = readControl(feature);
    setDisabled(current.disabled);
    setReason(current.reason);

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ControlState>).detail;
      if (!detail) return;
      setDisabled(detail.disabled);
      setReason(detail.reason);
    };

    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [eventName, feature]);

  const canDisableFn = options?.canDisable;
  const canDisableRef = useRef(canDisableFn);

  useEffect(() => {
    canDisableRef.current = canDisableFn;
  }, [canDisableFn]);

  const disable = useCallback(
    (disableOptions?: DisableOptions): ControlState => {
      const canDisable = canDisableRef.current;
      if (canDisable && !canDisable()) {
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
    [feature]
  );

  const enable = useCallback((): ControlState => {
    const next: ControlState = { disabled: false, reason: null };
    writeControl(feature, next);
    return next;
  }, [feature]);

  return useMemo(
    () => ({
      isDisabled: disabled,
      disabledReason: reason,
      disable,
      enable,
    }),
    [disabled, reason, disable, enable]
  );
};
