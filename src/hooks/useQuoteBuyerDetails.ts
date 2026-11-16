import { useMemo } from 'react';
import {
  BuyerDetailsData,
  BuyerDetailsInput,
  QuoteHookResult,
} from '../types/api';
import { QUOTE_ACTION, QUOTE_FEATURE } from '../events/constants';
import { invokeAction } from '../events/window';
import { useFeatureStatus } from './useFeatureStatus';

export interface QuoteBuyerDetailsActions {
  submit: (input: BuyerDetailsInput) => Promise<void>;
}

export type QuoteBuyerDetailsResult = QuoteHookResult<BuyerDetailsData> & {
  actions: QuoteBuyerDetailsActions;
};

export const useQuoteBuyerDetails = (): QuoteBuyerDetailsResult => {
  const status = useFeatureStatus<BuyerDetailsData>(
    QUOTE_FEATURE.BUYER_DETAILS
  );

  const actions = useMemo<QuoteBuyerDetailsActions>(
    () => ({
      submit: (input: BuyerDetailsInput) =>
        invokeAction<Promise<void>>(QUOTE_ACTION.SUBMIT_BUYER_DETAILS, input),
    }),
    []
  );

  return { ...status, actions };
};
