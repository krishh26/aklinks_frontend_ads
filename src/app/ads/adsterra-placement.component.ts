import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';

import { getAdsterraPlacement, type AdsterraPlacementKey } from './adsterra.config';
import { AdsterraLoaderService } from './adsterra-loader.service';

@Component({
  selector: 'app-adsterra-placement',
  standalone: true,
  templateUrl: './adsterra-placement.component.html',
  styleUrl: './adsterra-placement.component.scss',
})
export class AdsterraPlacementComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly loader = inject(AdsterraLoaderService);
  private readonly el = inject(ElementRef<HTMLElement>);

  @Input({ required: true }) placementKey!: AdsterraPlacementKey;

  isActive(): boolean {
    return getAdsterraPlacement(this.placementKey) != null;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const placement = getAdsterraPlacement(this.placementKey);
    const host = this.el.nativeElement.querySelector('[data-adsterra-host]') as HTMLElement | null;
    if (!placement || !host) {
      return;
    }
    host.style.setProperty('--adsterra-min-w', `${placement.width}px`);
    host.style.setProperty('--adsterra-min-h', `${placement.height}px`);
    void this.loader.loadInto(host, placement);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const host = this.el.nativeElement.querySelector('[data-adsterra-host]') as HTMLElement | null;
    if (host) {
      host.replaceChildren();
    }
  }
}
