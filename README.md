# @hubspot/quote-dev-sdk

TypeScript types for developers building custom React modules for HubSpot Commerce Hub quote templates.

It exports `QuoteTemplateContext` and its member types. Use them to type the quote data you pipe from HubL into your React module so autocomplete works and typos on property names become compile errors instead of runtime blanks.

## Install

```sh
npm install --save-dev @hubspot/quote-dev-sdk
```

## Background

When HubSpot renders a Commerce Hub quote, the quote template has a `quoteTemplateContext` HubL variable in scope. It contains the quote itself and every CRM record associated to it — line items, buyer contacts, buyer and billing companies, the parent deal, quote documents, and signers — **including the custom properties defined on those records in your portal**. You don't need to make CRM API calls from a module to pull any of this; it's already there.

To get that data into a React module, export a `hublDataTemplate` from the module. It's a HubL string that runs on the server; whatever object it builds becomes the `hublData` prop the React `Component` receives. This SDK types the shape of `quoteTemplateContext` so you can type both sides of that bridge against the same contract.

For the underlying framework — React modules, `hublDataTemplate`, and server-rendered `hublData` props — see the HubSpot developer docs: [CMS React + HubL overview](https://developers.hubspot.com/docs/cms/start-building/introduction/react-plus-hubl/overview).

## Example A — pass the whole context through

When a module needs broad access (totals, line items, contacts, signers), forward the whole `quoteTemplateContext` and type `hublData` with `QuoteTemplateContext` directly.

```tsx
// src/cms-assets/my-react-assets/components/modules/QuoteSummary/index.tsx
import {
  ModuleFields,
  TextField,
} from '@hubspot/cms-components/fields';
import type { QuoteTemplateContext } from '@hubspot/quote-dev-sdk';

interface FieldValues {
  headline: string;
}

interface HublData {
  quoteContext: QuoteTemplateContext;
}

interface Props {
  fieldValues: FieldValues;
  hublData: HublData;
}

export function Component({ fieldValues, hublData }: Props) {
  const { quote, lineItems, signers } = hublData.quoteContext;

  const subtotal = lineItems.reduce<number>(
    (sum, item) => sum + (item.amount ?? 0),
    0,
  );

  return (
    <section>
      <h2>{fieldValues.headline}</h2>
      <p>
        {quote.hs_title} — {quote.hs_currency} {subtotal.toFixed(2)}
      </p>
      <ul>
        {signers.map((signer) => (
          <li key={signer.email}>
            {signer.firstName} {signer.lastName}
          </li>
        ))}
      </ul>
    </section>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Headline" default="Quote summary" />
  </ModuleFields>
);

export const meta = {
  label: 'Quote Summary',
  content_types: ['QUOTE', 'QUOTE_BLUEPRINT'],
};

export const hublDataTemplate = `
  {% set hublData = {
      "quoteContext": quoteTemplateContext
    }
  %}
`;
```

## Example B — pass a slice and narrow the type

When a module only touches part of the context, pipe just that slice through HubL and use a TypeScript utility type (`Pick`, `Omit`, `Partial`, etc.) so the type on the React side matches exactly what you sent.

```tsx
// src/cms-assets/my-react-assets/components/modules/ExpirationBanner/index.tsx
import {
  ModuleFields,
  TextField,
} from '@hubspot/cms-components/fields';
import type { QuoteTemplateContext } from '@hubspot/quote-dev-sdk';

interface FieldValues {
  headline: string;
}

interface HublData {
  quote: Pick<QuoteTemplateContext['quote'], 'hs_title'>;
  expirationDateFormatted: string;
}

interface Props {
  fieldValues: FieldValues;
  hublData: HublData;
}

export function Component({ fieldValues, hublData }: Props) {
  const { expirationDateFormatted, quote } = hublData;

  return (
    <aside>
      <h3>{fieldValues.headline}</h3>
      <p>
        {quote.hs_title} expires on {expirationDateFormatted}.
      </p>
    </aside>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="headline" label="Headline" default="Act before it expires" />
  </ModuleFields>
);

export const meta = {
  label: 'Expiration Banner',
  content_types: ['QUOTE', 'QUOTE_BLUEPRINT'],
};

export const hublDataTemplate = `
  {% set hublData = {
      "quote": {
        "hs_title": quoteTemplateContext.quote.hs_title
      },
      "expirationDateFormatted": quoteTemplateContext.quote.hs_expiration_date|format_date('long')
    }
  %}
`;
```

Other handy utility-type patterns:

```ts
import type { QuoteTemplateContext, LineItemProperties } from '@hubspot/quote-dev-sdk';

// Line items only.
type LineItemsOnly = Pick<QuoteTemplateContext, 'lineItems'>;

// Everything except documents.
type WithoutDocuments = Omit<QuoteTemplateContext, 'quoteDocuments'>;

// A specific line-item subset.
type BillingFields = Pick<
  LineItemProperties,
  'name' | 'amount' | 'hs_recurring_billing_period' | 'hs_term_in_months'
>;
```

## Extending with custom properties

The named fields on the CRM-backed property bags cover HubSpot's built-in fields and are **not exhaustive**. Each type carries a `[key: string]: CrmPropertyValue | undefined` index signature, so any custom property defined in your portal is still accessible at runtime — but it'll come through typed as `unknown`. To get typed access to your custom properties, extend the base types and plug them back into `QuoteTemplateContext`:

```ts
import type {
  QuoteTemplateContext,
  QuoteProperties,
  LineItemProperties,
} from '@hubspot/quote-dev-sdk';

interface PortalQuoteProperties extends QuoteProperties {
  my_industry_vertical?: 'saas' | 'retail' | 'manufacturing';
  my_contract_renewal_count?: number;
}

interface PortalLineItemProperties extends LineItemProperties {
  my_internal_sku?: string;
}

interface PortalQuoteContext extends QuoteTemplateContext {
  quote: PortalQuoteProperties;
  lineItems: PortalLineItemProperties[];
}
```

Then use `PortalQuoteContext` wherever you'd use `QuoteTemplateContext` — e.g. as the type of `hublData.quoteContext` in the examples above.

## Versioning

Follows [semver](https://semver.org/). Adding optional fields is a minor release; adding a required field to `QuoteTemplateContext` or narrowing an existing field is a major release.

## License

MIT
