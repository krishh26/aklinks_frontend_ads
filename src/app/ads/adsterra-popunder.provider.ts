import { DOCUMENT } from '@angular/common';
import { inject, provideAppInitializer } from '@angular/core';

import { ADSTERRA_POPUNDER_SCRIPT_SRC } from './adsterra.config';

/**
 * Loads the popunder script once at app bootstrap (Adsterra expects a single global tag).
 */
export function provideAdsterraPopunder(): ReturnType<typeof provideAppInitializer> {
  return provideAppInitializer(() => {
    const doc = inject(DOCUMENT);
    const src = ADSTERRA_POPUNDER_SCRIPT_SRC?.trim();
    if (!src || !doc.defaultView) {
      return;
    }
    if (doc.querySelector('script[data-adsterra-popunder="1"]')) {
      return;
    }
    const s = doc.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute('data-adsterra-popunder', '1');
    const anchor = doc.body ?? doc.documentElement;
    anchor.appendChild(s);
  });
}
