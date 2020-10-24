import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-initial-setup-tips-android',
  templateUrl: './initial-setup-tips-android.component.html',
  styleUrls: ['./initial-setup-tips-android.component.css']
})
export class InitialSetupTipsAndroidComponent implements OnInit {

  icons = {
    share: faEllipsisV
  };

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  finishSetup(): void {
    this.dataservice.setSetupCompleted(true);
  }
}
