import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-initial-setup-tips',
  templateUrl: './initial-setup-tips.component.html',
  styleUrls: ['./initial-setup-tips.component.css']
})
export class InitialSetupTipsComponent implements OnInit {

  icons = {
    close: faTimes
  };

  constructor() { }

  ngOnInit(): void {
  }

}
