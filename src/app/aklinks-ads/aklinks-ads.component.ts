import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ADSTERRA_SMARTLINK_URL, adsterraSmartlinkActive } from '../ads/adsterra.config';
import { AdsterraPlacementComponent } from '../ads/adsterra-placement.component';
import { ProgressMagnifyContainerComponent } from '../ads/progress-magnify-container.component';

@Component({
  selector: 'app-aklinks-ads',
  imports: [CommonModule, AdsterraPlacementComponent, ProgressMagnifyContainerComponent],
  templateUrl: './aklinks-ads.component.html',
  styleUrl: './aklinks-ads.component.scss'
})
export class AklinksAdsComponent implements OnInit, OnDestroy {
  /** Adsterra Smartlink (URL from GET CODE — not an iframe). */
  readonly adsterraSmartlinkUrl = ADSTERRA_SMARTLINK_URL.trim();
  readonly showAdsterraSmartlink = adsterraSmartlinkActive();

  // Button states for different positions
  buttonStates: { [key: number]: { showButton: boolean; showCountdown: boolean; countdown: number; enabled: boolean } } = {
    1: { showButton: true, showCountdown: false, countdown: 10, enabled: true },  // First button enabled initially
    2: { showButton: false, showCountdown: false, countdown: 10, enabled: false }, // Others disabled initially
    3: { showButton: false, showCountdown: false, countdown: 10, enabled: false },
    4: { showButton: false, showCountdown: false, countdown: 10, enabled: false }
  };
  
  showScrollMessage: boolean = false;
  showContinueButton: boolean = false;
  currentStep: number = 0;
  totalSteps: number = 4;
  completedSteps: number = 0; // Track completed steps
  countdownIntervals: { [key: number]: any } = {};
  redirectUrl: string = 'https://www.youtube.com';
  hasScrolled: boolean = false;
  scrollThreshold: number = 300; // pixels to scroll before continue button appears
  scrollProgress: number = 0; // Scroll progress percentage

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get redirect URL from query params if provided
    this.route.queryParams.subscribe(params => {
      if (params['url']) {
        this.redirectUrl = decodeURIComponent(params['url']);
      }
    });
  }

  ngOnDestroy(): void {
    this.clearAllIntervals();
    window.removeEventListener('scroll', this.onScroll);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.showScrollMessage && !this.hasScrolled) {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      
      // Update scroll progress (0-100%)
      this.scrollProgress = Math.min((scrollPosition / this.scrollThreshold) * 100, 100);
      
      if (scrollPosition >= this.scrollThreshold) {
        this.hasScrolled = true;
        this.showContinueButton = true;
        this.scrollProgress = 100;
      }
    }
  }

  clearAllIntervals(): void {
    Object.keys(this.countdownIntervals).forEach((key: any) => {
      if (this.countdownIntervals[key]) {
        clearInterval(this.countdownIntervals[key]);
      }
    });
    this.countdownIntervals = {};
  }

  clearInterval(step: number): void {
    if (this.countdownIntervals[step]) {
      clearInterval(this.countdownIntervals[step]);
      delete this.countdownIntervals[step];
    }
  }

  onButtonClick(step: number): void {
    // Only allow clicking if button is enabled and visible
    if (!this.buttonStates[step].enabled || !this.buttonStates[step].showButton) return;
    
    this.buttonStates[step].showButton = false;
    this.buttonStates[step].showCountdown = true;
    this.buttonStates[step].countdown = 10;
    this.currentStep = step;
    this.hasScrolled = false;
    this.showContinueButton = false;
    this.scrollProgress = 0;
    this.startCountdown(step);
  }

  startCountdown(step: number): void {
    this.countdownIntervals[step] = setInterval(() => {
      this.buttonStates[step].countdown--;
      
      if (this.buttonStates[step].countdown <= 0) {
        this.clearInterval(step);
        this.buttonStates[step].showCountdown = false;
        this.buttonStates[step].showButton = false; // Hide button after countdown
        this.showScrollMessage = true;
      }
    }, 1000);
  }

  onContinueClick(): void {
    this.showScrollMessage = false;
    this.showContinueButton = false;
    this.hasScrolled = false;
    this.scrollProgress = 0;
    
    // Mark current step as completed
    this.completedSteps = this.currentStep;
    
    if (this.currentStep >= this.totalSteps) {
      // Redirect to final URL (YouTube or provided URL)
      window.location.href = this.redirectUrl;
    } else {
      // Enable and show the next button
      const nextStep = this.currentStep + 1;
      if (nextStep <= this.totalSteps && this.buttonStates[nextStep]) {
        this.buttonStates[nextStep].enabled = true;
        this.buttonStates[nextStep].showButton = true;
        this.buttonStates[nextStep].countdown = 10;
      }
    }
  }

  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
