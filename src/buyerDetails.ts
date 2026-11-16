import { getQuoteConfig } from './events/window';
import type { BuyerDetailsRules, TaxType } from './types/api';

export const getTaxTypes = (): TaxType[] => getQuoteConfig()?.taxTypes ?? [];

export const getBuyerDetailsRules = (): BuyerDetailsRules | null =>
  getQuoteConfig()?.buyerDetailsRules ?? null;
