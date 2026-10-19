import { useMemo } from 'react';
import { QuotePdfData, QuoteHookResult } from '../types/api';
import { QUOTE_ACTION, QUOTE_FEATURE } from '../events/constants';
import { invokeAction } from '../events/window';
import { useFeatureStatus } from './useFeatureStatus';

export interface QuotePdfActions {
  reportPdfStale: () => void;
}

export interface QuotePdfResult extends QuoteHookResult<QuotePdfData> {
  data: QuotePdfData;
  actions: QuotePdfActions;
}

export const useQuotePdf = (): QuotePdfResult => {
  const { loading, error, data } =
    useFeatureStatus<QuotePdfData>(QUOTE_FEATURE.PDF);

  const actions = useMemo<QuotePdfActions>(
    () => ({
      reportPdfStale: () => {
        invokeAction<void>(QUOTE_ACTION.REPORT_PDF_STALE);
      },
    }),
    []
  );

  return {
    loading,
    error,
    data: data ?? { canReportPdfStale: false },
    actions,
  };
};
