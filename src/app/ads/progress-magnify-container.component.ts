import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';

import { AdsterraLoaderService } from './adsterra-loader.service';

@Component({
  selector: 'app-progress-magnify-container',
  standalone: true,
  template: `<div class="pm-container-ad" data-pm-container-host aria-label="Advertisement"></div>`,
  styles: [
    `
      .pm-container-ad {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        min-height: 1px;
      }
    `,
  ],
})
export class ProgressMagnifyContainerComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly loader = inject(AdsterraLoaderService);
  private readonly el = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const host = this.el.nativeElement.querySelector('[data-pm-container-host]') as HTMLElement | null;
    if (!host) {
      return;
    }
    void this.loader.loadProgressMagnifyContainerInto(host);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const host = this.el.nativeElement.querySelector('[data-pm-container-host]') as HTMLElement | null;
    if (host) {
      host.replaceChildren();
    }
  }
}
