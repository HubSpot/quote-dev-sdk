import { useCallback } from 'react';
import {
  FeatureControl,
  PaymentData,
  QuoteHookResult,
} from '../types/api';
import { QUOTE_FEATURE } from '../events/constants';
import { useFeatureControl } from './useFeatureControl';
import { useFeatureStatus } from './useFeatureStatus';

export type QuotePaymentResult = QuoteHookResult<PaymentData> & {
  control: FeatureControl;
};

export const useQuotePayment = (): QuotePaymentResult => {
  const status = useFeatureStatus<PaymentData>(QUOTE_FEATURE.PAYMENTS);

  const canDisable = useCallback(() => {
    if (!status.data) return true;
    if (status.data.status === 'PAID') return false;
    if (status.data.status === 'PROCESSING') return false;
    return true;
  }, [status.data]);

  const control = useFeatureControl(QUOTE_FEATURE.PAYMENTS, { canDisable });
  return { ...status, control };
};
