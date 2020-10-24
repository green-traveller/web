import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route';
import { DataService } from 'src/app/services/data.service';
import { APP_ICONS } from 'src/app/models/app-icons';
import { Vehicle } from 'src/app/models/vehicle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-previous-routes',
  templateUrl: './previous-routes.component.html',
  styleUrls: ['./previous-routes.component.css']
})
export class PreviousRoutesComponent implements OnInit {

  private modalRoute: Route;

  constructor(
    private dataService: DataService,
    private iconService: IconService,
    private routeService: RouteService,
    private modalService: NgbModal) { }

  open(content: any, route: Route): any {
    this.modalRoute = route;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  ngOnInit(): void {
  }

  getRoutes() {
    return Object.values(this.dataService.getRoutes());
  }

  deleteRoute(route: Route): void {
    this.dataService.deleteRoute(route);
  }

  validatePassengerInput(event: any, route: Route): void {
    if (!event.target.validity.valid) {
      event.target.value = 1;
    }

    route.passengers = event.target.value;

    this.dataService.setRoutePassengers(route, event.target.value);
  }

  getActiveVehicles(): Vehicle[] {
    return this.dataService.getActiveVehicles();
  }

  setVehicleType(vehicle: Vehicle): void {
    this.dataService.setRouteVehicle(this.modalRoute, vehicle.id);
    this.modalService.dismissAll();
  }
}
