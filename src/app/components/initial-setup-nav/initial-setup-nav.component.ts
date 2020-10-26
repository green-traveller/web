import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-initial-setup-nav',
  templateUrl: './initial-setup-nav.component.html',
  styleUrls: ['./initial-setup-nav.component.css']
})
export class InitialSetupNavComponent implements OnInit {

  @Input() dotsActive: number;
  @Input() nextPage: string;

  @Input() buttonName: string;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  setupCompleted(): void {
    if (this.nextPage === '/') {
    this.dataservice.setSetupCompleted(true);
    }
  }
}
