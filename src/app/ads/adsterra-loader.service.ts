import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import type { AdsterraPlacement } from './adsterra.config';
import { PROGRESS_MAGNIFY_CONTAINER_UNIT } from './progress-magnify.config';

/**
 * Loads ad invoke scripts sequentially. Multiple iframe placements share the global
 * `atOptions`; parallel loads race and break impressions.
 */
@Injectable({ providedIn: 'root' })
export class AdsterraLoaderService {
  private readonly document = inject(DOCUMENT);
  private chain: Promise<void> = Promise.resolve();

  /**
   * Progress Magnify: `<div id="container-{key}">` then async `invoke.js` with `data-cfasync="false"`.
   * Container must be in the DOM before the script (script looks up the id when it runs).
   */
  loadProgressMagnifyContainerInto(host: HTMLElement): Promise<void> {
    const unit = PROGRESS_MAGNIFY_CONTAINER_UNIT;
    const run = () =>
      new Promise<void>((resolve) => {
        const id = `container-${unit.key}`;
        const slot = this.document.createElement('div');
        slot.id = id;
        host.appendChild(slot);

        const script = this.document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `https://${unit.scriptHost}/${unit.key}/invoke.js`;
        const finish = () => resolve();
        script.onload = finish;
        script.onerror = finish;
        host.appendChild(script);
      });

    this.chain = this.chain.then(run, run);
    return this.chain;
  }

  loadInto(container: HTMLElement, placement: AdsterraPlacement): Promise<void> {
    const win = this.document.defaultView;
    if (!win) {
      return Promise.resolve();
    }

    const run = () =>
      new Promise<void>((resolve) => {
        const host = placement.scriptHost.replace(/^\/\//, '');
        const script = this.document.createElement('script');
        script.src = `https://${host}/${placement.key}/invoke.js`;
        script.async = false;

        (win as unknown as { atOptions: Record<string, unknown> }).atOptions = {
          key: placement.key,
          format: 'iframe',
          height: placement.height,
          width: placement.width,
          params: {},
        };

        const finish = () => resolve();
        script.onload = finish;
        script.onerror = finish;
        container.appendChild(script);
      });

    this.chain = this.chain.then(run, run);
    return this.chain;
  }
}
