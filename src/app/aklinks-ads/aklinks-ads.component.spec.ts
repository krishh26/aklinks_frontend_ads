import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdsterraLoaderService } from '../ads/adsterra-loader.service';
import { AklinksAdsComponent } from './aklinks-ads.component';

describe('AklinksAdsComponent', () => {
  let component: AklinksAdsComponent;
  let fixture: ComponentFixture<AklinksAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AklinksAdsComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AdsterraLoaderService,
          useValue: {
            loadInto: () => Promise.resolve(),
            loadProgressMagnifyContainerInto: () => Promise.resolve(),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AklinksAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
