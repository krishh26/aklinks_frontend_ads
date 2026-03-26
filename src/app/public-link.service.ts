import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LINK_API_BASE_URL } from './link-api.config';

export interface PublicLinkApiResponse {
  status: string;
  data: {
    id: string;
    shortLink: string;
    originalLink: string;
    clicks: number;
    createdAt: string;
  };
}

@Injectable({ providedIn: 'root' })
export class PublicLinkService {
  private readonly http = inject(HttpClient);

  getPublicLink(shortLink: string): Observable<PublicLinkApiResponse> {
    const path = `${LINK_API_BASE_URL}/link/public/${encodeURIComponent(shortLink)}`;
    return this.http.get<PublicLinkApiResponse>(path);
  }
}
