import { useEffect, useState } from 'react';
import { PDF_SIGNAL_ATTR, PDF_SIGNAL_NAME_ATTR } from '../events/constants';
import { emitPdfSignalResolved } from '../events/window';

export interface DeferPdfCaptureProps {
  name: string;
  ready: boolean;
}

export const DeferPdfCapture = ({ name, ready }: DeferPdfCaptureProps) => {
  const [isResolved, setIsResolved] = useState(ready);
  if (ready && !isResolved) setIsResolved(true);

  useEffect(() => {
    if (!name) {
      console.error(
        '[hs-quote] <DeferPdfCapture> needs a `name`; it will not delay PDF capture.'
      );
      return;
    }
    if (isResolved) emitPdfSignalResolved(name);
  }, [name, isResolved]);

  useEffect(() => {
    if (isResolved && !ready) {
      console.error(
        `[hs-quote] <DeferPdfCapture> "${name}" changed ready from true to false. A component marked ready can't go back to not ready.`
      );
    }
  }, [name, ready, isResolved]);

  if (isResolved || !name) return null;
  return (
    <span
      {...{ [PDF_SIGNAL_ATTR]: '', [PDF_SIGNAL_NAME_ATTR]: name }}
      hidden
      aria-hidden="true"
    />
  );
};
