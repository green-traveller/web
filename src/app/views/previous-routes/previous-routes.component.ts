import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route';
import { DataService } from 'src/app/services/data.service';
import { APP_ICONS } from 'src/app/models/app-icons';
import { Vehicle } from 'src/app/models/vehicle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-previous-routes',
  templateUrl: './previous-routes.component.html',
  styleUrls: ['./previous-routes.component.css']
})
export class PreviousRoutesComponent implements OnInit {

  public prevRoutes: Route[] = [
    {id: 'a', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'walking', passengers: 1, options: { walking: { distance: 30, duration: 40}, driving: {distance: 20, duration: 10}}},
    {id: 'a', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'bicycling', passengers: 1, options: { bicycling: { distance: 30, duration: 40}}},
    {id: 'a', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'transit', passengers: 1, options: { transit: { distance: 30, duration: 40}}},
    {id: 'a', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'driving', passengers: 1, options: { driving: { distance: 30, duration: 40}}},
    {id: 'a', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'walking', passengers: 4, options: { walking: { distance: 30, duration: 40}}},
    {id: 'b', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'bicycling', passengers: 4, options: { bicycling: { distance: 30, duration: 40}}},
    {id: 'b', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'transit', passengers: 4, options: { transit: { distance: 30, duration: 40}}},
    {id: 'b', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'driving', passengers: 4, options: { driving: { distance: 30, duration: 40}}},
    {id: 'b', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'thisIsInvalid', passengers: 4, options: { walking: { distance: 30, duration: 40}}},
    {id: 'b', from: {name: 'start', place_id: '1'}, to: {name: 'destination', place_id: '2'}, time: '01-01-1970', vehicleId: 'driving', passengers: 4, options: { }}
  ];

  public vehicle;

  // TODO: How to use the correct type?
  public icons;

  private modalRoute: Route;

  constructor(private dataService: DataService, private modalService: NgbModal) { }

  open(content: any, route: Route): any {
    this.modalRoute = route;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  ngOnInit(): void {
    this.icons = APP_ICONS;
    this.vehicle = this.dataService.getVehicles();
  }

  // TODO: Move to a route service
  getRouteCO2(route: Route): number {
    let routeCO2 = 0;
    const vehicle = this.dataService.getVehicle(route.vehicleId);

    if (vehicle && route.options[route.vehicleId]) {
      // Guess CO2 is always per 100km
      routeCO2 = vehicle.co2 * route.options[route.vehicleId].distance / 1000;

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

  editVehicleForRoute(route: Route): void {
    console.log('editVehicleForRoute');
    console.log(route);
  }

  // TODO: Move to a route service (and data-service)
  deleteRoute(route: Route): void {
    console.log('deleteRoute');
    console.log(route);
  }

  // TODO: Implement
  // TODO: Move to a route service
  hasRouteMap(route: Route): boolean {
    return route.id === 'b';
  }

  // TODO: Move to a route Service
  getRouteMapLink(route: Route): string {
    let mapLink = 'https://www.google.de/maps/preview';

    return mapLink;
  }

  getRouteDuration(route: Route): number {
    return route.options[route.vehicleId].duration;
  }

  getRouteDistance(route: Route): number {
    return route.options[route.vehicleId].distance;
  }

  validatePassengerInput(event: any, route: Route): void {
    if (!event.target.validity.valid) {
      event.target.value = 1;
    }

    route.passengers = event.target.value;

    // TODO: actually save this
  }

  getActiveVehicles(): Vehicle[] {
    return this.dataService.getActiveVehicles();
  }

  getDefaultVehicles(): Vehicle[] {
    return this.dataService.getDefaultVehicles();
  }

  getCustomVehicles(): Vehicle[] {
    return this.dataService.getCustomActiveVehicles();
  }

  setVehicleType(vehicle: Vehicle): void {
    console.log('set vehicle');
    console.log(this.modalRoute.id);
    console.log(vehicle.id);
    this.modalService.dismissAll();
  }

}
