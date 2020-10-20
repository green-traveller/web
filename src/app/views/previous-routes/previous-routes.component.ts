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
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'walking', passengers: 1, distance: 43.3, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'bicycling', passengers: 1, distance: 43.3, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'transit', passengers: 1, distance: 43.3, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'driving', passengers: 1, distance: 43.3, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'walking', passengers: 4, distance: 43.3, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'bicycling', passengers: 4, distance: 43.3, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'transit', passengers: 4, distance: 43.3, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'driving', passengers: 4, distance: 43.3, options: {}},
    {from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'thisIsInvalid', passengers: 4, distance: 43.3, options: {}}
  ];

  public vehicles: Vehicle[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicles = this.dataService.getVehicles();
  }

  getRouteCO2(route: Route): number {
    let routeCO2 = 0;
    const vehicle = this.vehicles.filter((v) => v.id === route.vehicleId)[0];

    if (vehicle) {
      // Guess CO2 is always per 100km
      routeCO2 = vehicle.co2 * route.distance / 100;

      // using transit with multiple passengers does not reduce CO2 per person
      if (route.vehicleId !== 'transit') {
        routeCO2 /= route.passengers;
      }
    }

    return routeCO2;
  }

  getVehicleType(route: Route): string {
    const vehicle = this.vehicles.filter((v) => v.id === route.vehicleId)[0];

    if (vehicle) {
      return vehicle.type;
    } else {
      return 'unknown';
    }
  }

}
