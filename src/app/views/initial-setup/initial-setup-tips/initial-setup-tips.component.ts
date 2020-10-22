import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-initial-setup-tips',
  templateUrl: './initial-setup-tips.component.html',
  styleUrls: ['./initial-setup-tips.component.css']
})
export class InitialSetupTipsComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  finishSetup(): void {
    this.dataservice.setSetupCompleted(true);
  }
}
