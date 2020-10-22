import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { faExternalLinkAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-initial-setup-tips',
  templateUrl: './initial-setup-tips.component.html',
  styleUrls: ['./initial-setup-tips.component.css']
})
export class InitialSetupTipsComponent implements OnInit {

  icons = {
    share: faExternalLinkAlt,
    add: faPlusSquare
  };

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  finishSetup(): void {
    this.dataservice.setSetupCompleted(true);
  }
}
