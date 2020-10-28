import { Component, OnInit } from '@angular/core';

const STEPS = {
  android: [ { image: 'share_android' }, { image: 'add_android', small: true }],
  iOS: [ { image: 'share_apple' }, { image: 'add_apple' } ],
  samsung: [ { image: 'add_samsung'} ]
};

@Component({
  selector: 'app-installation-instructions',
  templateUrl: './installation-instructions.component.html',
  styleUrls: ['./installation-instructions.component.css']
})
export class InstallationInstructionsComponent implements OnInit {

  os: string;
  steps: any;

  constructor() { }

  ngOnInit(): void {
    this.os = this.getMobileOperatingSystem();
    if (this.os === 'unknown') {
      this.steps = STEPS.samsung;
    } else {
      this.steps = STEPS[this.os];
    }
  }

  getMobileOperatingSystem(): string {
    const userAgent = (navigator.userAgent || navigator.vendor);
    if (/android/i.test(userAgent)) {
      return 'android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
    if (/SAMSUNG|SGH-[I|N|T]|GT-[I|P|N]|SM-[N|P|T|Z|G]|SHV-E|SCH-[I|J|R|S]|SPH-L/i.test(userAgent)) {
      return 'samsung';
    }
    return 'unknown';
  }

}
