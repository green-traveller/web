import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-setup-name',
  templateUrl: './initial-setup-name.component.html',
  styleUrls: ['./initial-setup-name.component.css']
})
export class InitialSetupNameComponent implements OnInit {

  buttonName = 'Let\'s move on';

  constructor() { }

  ngOnInit(): void {
  }

}
