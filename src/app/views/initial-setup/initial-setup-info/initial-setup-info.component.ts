import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-initial-setup-info',
  templateUrl: './initial-setup-info.component.html',
  styleUrls: ['./initial-setup-info.component.css']
})
export class InitialSetupInfoComponent implements OnInit {

  icons = {
    close: faTimes
  };

  constructor() { }

  ngOnInit(): void {
  }

}
