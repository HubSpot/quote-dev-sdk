import { ControlState, QuoteFeature } from '../types/api';
import { QUOTE_EVENT, QUOTE_FEATURE } from './constants';

interface HsQuoteGlobal {
  eventCache: Record<string, unknown>;
  controls: Record<QuoteFeature, ControlState>;
}

declare global {
  interface Window {
    __hsQuote?: HsQuoteGlobal;
  }
}

const DEFAULT_CONTROL_STATE: ControlState = {
  disabled: false,
  reason: null,
};

const getGlobal = (): HsQuoteGlobal | null => {
  if (typeof window === 'undefined') return null;
  if (!window.__hsQuote) {
    window.__hsQuote = {
      eventCache: {},
      controls: {
        [QUOTE_FEATURE.ACCEPTANCE]: { ...DEFAULT_CONTROL_STATE },
        [QUOTE_FEATURE.PAYMENTS]: { ...DEFAULT_CONTROL_STATE },
      },
    };
  }
  return window.__hsQuote;
};

export const getControlEventName = (feature: QuoteFeature): string | null => {
  switch (feature) {
    case QUOTE_FEATURE.ACCEPTANCE:
      return QUOTE_EVENT.CONTROL_ACCEPTANCE;
    case QUOTE_FEATURE.PAYMENTS:
      return QUOTE_EVENT.CONTROL_PAYMENTS;
    default:
      console.warn(
        `[hs-quote] Unsupported quote feature: ${String(feature)}`
      );
      return null;
  }
};

export const getStateEventName = (feature: QuoteFeature): string | null => {
  switch (feature) {
    case QUOTE_FEATURE.ACCEPTANCE:
      return QUOTE_EVENT.ACCEPTANCE;
    case QUOTE_FEATURE.PAYMENTS:
      return QUOTE_EVENT.PAYMENTS;
    default:
      console.warn(
        `[hs-quote] Unsupported quote feature: ${String(feature)}`
      );
      return null;
  }
};

export const readEventCache = <T>(name: string | null): T | null => {
  if (!name) return null;
  const g = getGlobal();
  if (!g) return null;
  const cached = g.eventCache[name];
  return cached === undefined ? null : (cached as T);
};

export const readControl = (feature: QuoteFeature): ControlState => {
  const g = getGlobal();
  if (!g) return { ...DEFAULT_CONTROL_STATE };
  return g.controls[feature];
};

export const writeControl = (
  feature: QuoteFeature,
  state: ControlState
): void => {
  const g = getGlobal();
  if (!g) return;
  const eventName = getControlEventName(feature);
  if (!eventName) return;
  // Freeze so a listener that mutates `detail` can't corrupt the cached copy.
  const frozen = Object.freeze({ ...state });
  g.controls[feature] = frozen;
  window.dispatchEvent(
    new CustomEvent<ControlState>(eventName, { detail: frozen })
  );
};
