import { Routes } from '@angular/router';
import { AklinksAdsComponent } from './aklinks-ads/aklinks-ads.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'aklinks-ads',
  },
  {
    path: 'aklinks-ads',
    component: AklinksAdsComponent,
  },
  /** e.g. /NVKBgD4t — short code resolved via public link API */
  {
    path: ':shortLink',
    component: AklinksAdsComponent,
  },
];
