import {Component, Input, OnInit} from '@angular/core';
import {
  faCarSide,
  faMotorcycle,
  faBicycle,
  faWalking,
  faSubway
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-icon',
  templateUrl: './vehicle-icon.component.html',
  styleUrls: ['./vehicle-icon.component.css']
})
export class VehicleIconComponent implements OnInit {

  @Input() vehicle: string;
  @Input() active: boolean;

  icons = {
    car: faCarSide,
    motorcycle: faMotorcycle,
    bicycle: faBicycle,
    train: faSubway,
    walking: faWalking
  };

  constructor() { }

  ngOnInit(): void {
  }

}
