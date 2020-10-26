import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route';
import { DataService } from 'src/app/services/data.service';
import { Vehicle } from 'src/app/models/vehicle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { RouteService } from 'src/app/services/route.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
    private modalService: NgbModal,
    private location: Location,
    private router: Router
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
    return new Date(d).toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  }

  deleteRoute(route: Route): void {
    this.dataService.deleteRoute(route);
  }

  handlePassengerChangeButton(route: Route, x: number): void {
    let passengerCount = route.passengers;
    passengerCount = x + passengerCount;
    if (passengerCount < 1) {
      passengerCount = 1;
    }
    this.dataService.setRoutePassengers(route, passengerCount);
  }

  validatePassengerInput(event: any, route: Route): void {
    const target = event.target;
    if (!target.validity.valid || target.value === '') {
      target.valueAsNumber = 1;
    }
    route.passengers = target.valueAsNumber;
    this.dataService.setRoutePassengers(route, target.valueAsNumber);
  }

  getActiveVehicles(): Vehicle[] {
    return this.dataService.getActiveVehicles();
  }

  setVehicleType(vehicle: Vehicle): void {
    this.dataService.setRouteVehicle(this.modalRoute, vehicle.id);
    this.modalService.dismissAll();
  }

  getVerticalSpaceBetween(firstElement: HTMLDivElement, secondElement: HTMLDivElement): number {
    return Math.round(secondElement.children[0].getBoundingClientRect().top - (firstElement.children[0].getBoundingClientRect().top + 14));
  }

  handleBackToSearchClick(): void {
    this.router.navigateByUrl('/');
    this.location.replaceState('/');
  }
}
