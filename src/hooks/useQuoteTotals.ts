import { useMemo } from 'react';
import type { QuoteTotals } from '../quoteTemplateContext';
import type { QuoteHookResult } from '../types/api';
import { QUOTE_FEATURE, QUOTE_ACTION } from '../events/constants';
import { invokeAction } from '../events/window';
import { useFeatureStatus } from './useFeatureStatus';

export interface QuoteTotalsActions {
  recalculate: () => Promise<QuoteTotals | null>;
}

export type QuoteTotalsResult = QuoteHookResult<QuoteTotals> & {
  actions: QuoteTotalsActions;
};

export const useQuoteTotals = (): QuoteTotalsResult => {
  const status = useFeatureStatus<QuoteTotals>(QUOTE_FEATURE.TOTALS);

  const actions = useMemo(() => ({
    recalculate: () => invokeAction<Promise<QuoteTotals | null>>(QUOTE_ACTION.RECALCULATE_TOTALS),
  }), []);

  return { ...status, actions };
};
