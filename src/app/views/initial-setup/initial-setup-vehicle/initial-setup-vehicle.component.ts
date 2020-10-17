import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-setup-vehicle',
  templateUrl: './initial-setup-vehicle.component.html',
  styleUrls: ['./initial-setup-vehicle.component.css']
})
export class InitialSetupVehicleComponent implements OnInit {

  currentOrientation = 'yes';

  constructor() { }

  ngOnInit(): void {
  }

}
