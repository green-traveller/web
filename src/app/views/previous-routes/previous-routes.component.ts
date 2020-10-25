import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route';
import { DataService } from 'src/app/services/data.service';
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
  iconS: IconService;
  routeS: RouteService;

  constructor(
    private dataService: DataService,
    private iconService: IconService,
    private routeService: RouteService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.iconS = this.iconService;
    this.routeS = this.routeService;
  }

  openModalWindow(content: any, route: Route): any {
    this.modalRoute = route;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  getRoutes(): Route[] {
    return this.dataService.getRoutes();
  }

  getRoutesByDate(): { [date: string]: Route[] } {
    return this.dataService.getRoutesByDate();
  }

  getRoutesDates(): string[] {
    return this.dataService.getRoutesDates();
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  }

  deleteRoute(route: Route): void {
    this.dataService.deleteRoute(route);
  }

  validatePassengerInput(event: any, route: Route): void {
    const target = event.target;

    if (!target.validity.valid) {
      target.value = 1;
    }

    route.passengers = target.value;

    this.dataService.setRoutePassengers(route, target.value);
  }

  getPossibleVehicles(): Vehicle[] {
    return this.routeService.getPossibleVehicles(this.modalRoute);
  }

  setVehicleType(vehicle: Vehicle): void {
    this.dataService.setRouteVehicle(this.modalRoute, vehicle.id);
    this.modalService.dismissAll();
  }

  getVerticalSpaceBetween(firstElement: HTMLDivElement, secondElement: HTMLDivElement): number {
    return secondElement.children[0].getBoundingClientRect().top - (firstElement.children[0].getBoundingClientRect().top + 14);
  }
}
