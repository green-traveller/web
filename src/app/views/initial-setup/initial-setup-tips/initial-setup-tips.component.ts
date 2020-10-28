import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-setup-tips',
  templateUrl: './initial-setup-tips.component.html',
  styleUrls: ['./initial-setup-tips.component.css']
})
export class InitialSetupTipsComponent implements OnInit {

  os: string;

  constructor() { }

  ngOnInit(): void {
    this.os = this.getMobileOperatingSystem();
  }

  getMobileOperatingSystem(): string {
    const userAgent = (navigator.userAgent || navigator.vendor);
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
    if (/SAMSUNG|SGH-[I|N|T]|GT-[I|P|N]|SM-[N|P|T|Z|G]|SHV-E|SCH-[I|J|R|S]|SPH-L/i.test(userAgent)) {
      return 'Samsung';
    }
    return 'unknown';
  }
}
