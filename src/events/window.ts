import { ControlState, QuoteFeature } from '../types/api';
import { QUOTE_EVENT, QUOTE_FEATURE } from './constants';

type ActionFn = (...args: any[]) => any;

interface HsQuoteGlobal {
  eventCache: Record<string, unknown>;
  controls: Partial<Record<QuoteFeature, ControlState>>;
  actions: Record<string, ActionFn>;
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
      actions: {},
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
    case QUOTE_FEATURE.TOTALS:
      return QUOTE_EVENT.TOTALS;
    case QUOTE_FEATURE.PDF:
      return QUOTE_EVENT.PDF;
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
  return g.controls[feature] ?? { ...DEFAULT_CONTROL_STATE };
};

export const writeControl = (
  feature: QuoteFeature,
  state: ControlState
): void => {
  const g = getGlobal();
  if (!g) return;
  const eventName = getControlEventName(feature);
  if (!eventName) return;
  const frozen = Object.freeze({ ...state });
  g.controls[feature] = frozen;
  window.dispatchEvent(
    new CustomEvent<ControlState>(eventName, { detail: frozen })
  );
};

export const invokeAction = <T>(name: string): T => {
  const g = getGlobal();
  const fn = g?.actions[name];
  if (!fn) {
    console.warn(`[hs-quote] Action "${name}" not registered`);
    return Promise.resolve(null) as T;
  }
  return fn() as T;
};

export const writeAction = (name: string, fn: ActionFn): void => {
  const g = getGlobal();
  if (!g) return;
  g.actions[name] = fn;
};
