import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AklinksAdsComponent } from './aklinks-ads.component';

describe('AklinksAdsComponent', () => {
  let component: AklinksAdsComponent;
  let fixture: ComponentFixture<AklinksAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AklinksAdsComponent]
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
