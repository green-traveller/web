import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { faExternalLinkAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-initial-setup-tips',
  templateUrl: './initial-setup-tips.component.html',
  styleUrls: ['./initial-setup-tips.component.css']
})
export class InitialSetupTipsComponent implements OnInit {

  os: string;

  icons = {
    share: faExternalLinkAlt,
    add: faPlusSquare
  };

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.os = this.getMobileOperatingSystem();
  }

  getMobileOperatingSystem(): string {
    const userAgent = (navigator.userAgent || navigator.vendor); // || window.opera
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
    return 'unknown';
  }
}
