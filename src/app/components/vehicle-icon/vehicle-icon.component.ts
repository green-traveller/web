import {Component, Input, OnInit} from '@angular/core';
import {
  faBicycle,
  faCarSide,
  faMotorcycle,
  faSubway,
  faWalking
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-icon',
  templateUrl: './vehicle-icon.component.html',
  styleUrls: ['./vehicle-icon.component.css']
})
export class VehicleIconComponent implements OnInit {

  @Input() vehicle: string;
  @Input() active: boolean;
  @Input() whiteBorder: boolean;

  icons = {
    bicycle: faBicycle,
    car: faCarSide,
    motorcycle: faMotorcycle,
    train: faSubway,
    walking: faWalking
  };

  constructor() { }

  ngOnInit(): void {
  }

}
