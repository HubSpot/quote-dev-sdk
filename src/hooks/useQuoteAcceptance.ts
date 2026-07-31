import { useCallback } from 'react';
import {
  AcceptanceData,
  FeatureControl,
  QuoteHookResult,
} from '../types/api';
import { QUOTE_FEATURE } from '../events/constants';
import { useFeatureControl } from './useFeatureControl';
import { useFeatureStatus } from './useFeatureStatus';

export type QuoteAcceptanceResult = QuoteHookResult<AcceptanceData> & {
  control: FeatureControl;
};

export const useQuoteAcceptance = (): QuoteAcceptanceResult => {
  const status = useFeatureStatus<AcceptanceData>(QUOTE_FEATURE.ACCEPTANCE);

  const canDisable = useCallback(() => {
    if (!status.data) return true;
    if (status.data.accepted) return false;
    if (status.data.acceptanceMethod === 'print_and_sign') return false;
    return true;
  }, [status.data]);

  const control = useFeatureControl(QUOTE_FEATURE.ACCEPTANCE, { canDisable });
  return { ...status, control };
};
