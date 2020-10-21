import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Route } from 'src/app/models/route';
import { Vehicle } from 'src/app/models/vehicle';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-previous-routes',
  templateUrl: './previous-routes.component.html',
  styleUrls: ['./previous-routes.component.css']
})
export class PreviousRoutesComponent implements OnInit {

  public prevRoutes: Route[] = [
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'walking', passengers: 1, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'bicycling', passengers: 1, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'transit', passengers: 1, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'driving', passengers: 1, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'walking', passengers: 4, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'bicycling', passengers: 4, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'transit', passengers: 4, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'driving', passengers: 4, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'thisIsInvalid', passengers: 4, options: {}}
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  getRouteCO2(route: Route): number {
    let routeCO2 = 0;
    const vehicle = this.dataService.getVehicle(route.vehicleId);

    if (vehicle) {
      // Guess CO2 is always per 100km
      //routeCO2 = vehicle.co2 * route.distance / 100;

      // using transit with multiple passengers does not reduce CO2 per person
      if (route.vehicleId !== 'transit') {
        routeCO2 /= route.passengers;
      }
    }

    return routeCO2;
  }

  getVehicleType(route: Route): string {
    const vehicle = this.dataService.getVehicle(route.vehicleId);

    if (vehicle) {
      return vehicle.type;
    } else {
      return 'unknown';
    }
  }

}
