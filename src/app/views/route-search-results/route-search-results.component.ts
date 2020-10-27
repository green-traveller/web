import {Component, OnInit} from '@angular/core';
import {Route} from 'src/app/models/route';
import {DataService} from 'src/app/services/data.service';
import {Vehicle} from 'src/app/models/vehicle';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IconService} from 'src/app/services/icon.service';
import {RouteService} from 'src/app/services/route.service';
import {ResultService} from 'src/app/services/result.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-route-search-results',
  templateUrl: './route-search-results.component.html',
  styleUrls: ['./route-search-results.component.css']
})
export class RouteSearchResultsComponent implements OnInit {

  public route: Route;
  public routeResults: Route[] = [];

  routeS: RouteService;
  iconS: IconService;

  constructor(
    private dataService: DataService,
    private routeService: RouteService,
    private resultService: ResultService,
    private iconService: IconService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iconS = this.iconService;
    this.routeS = this.routeService;

    if (this.resultService.getRoute()) {
      this.route = this.resultService.getRoute();
      this.setRoutePerOption();
    } else {
      this.navigate('/');
    }
  }

  setRoutePerOption(): void {
    const activeVehicles = this.routeService.getPossibleVehicles(this.route);
    for (const vehicle of activeVehicles) {
      this.route.vehicleId = vehicle.id;
      this.routeResults.push(JSON.parse(JSON.stringify(this.route)));
    }
  }

  saveRoute(route: Route): void {
    this.dataService.setRoute(JSON.parse(JSON.stringify(route)));
    this.resultService.resetRoute();
    this.navigate('previous-routes');
  }

  getCustomVehicleName(route: Route): string {
    if (this.dataService.getDefaultVehicles().indexOf(this.dataService.getVehicle(route.vehicleId)) < 0) {
      return this.dataService.getVehicle(route.vehicleId).name;
    }
  }

  getRoute(): Route[] {
    return this.routeResults;
  }

  getSortedRoute(): Route[] {
    return this.routeResults.sort((a, b) =>
      (this.routeService.getCo2Grams(a) > this.routeService.getCo2Grams(b)) ? 1 :
        ((this.routeService.getCo2Grams(b) > this.routeService.getCo2Grams(a)) ? -1 : 0));
  }

  handleBackToSearchClick(): void {
    this.navigate('/');
  }

  navigate(s: string): void {
    this.router.navigateByUrl(s);
    this.location.replaceState(s);
  }
}
