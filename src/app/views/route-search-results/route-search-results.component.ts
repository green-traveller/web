import {Component, OnInit} from '@angular/core';
import {Route} from 'src/app/models/route';
import {DataService} from 'src/app/services/data.service';
import {Vehicle} from 'src/app/models/vehicle';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IconService} from 'src/app/services/icon.service';
import {RouteService} from 'src/app/services/route.service';
import {ResultService} from 'src/app/services/result.service'

@Component({
  selector: 'app-route-search-results',
  templateUrl: './route-search-results.component.html',
  styleUrls: ['./route-search-results.component.css']
})
export class RouteSearchResultsComponent implements OnInit {


  public route: Route =
    {
      "id": "new",
      "from": {
        "name": "Barfusstraße, Berlin, Germany",
        "place_id": "Eh5CYXJmdXNzdHJhw59lLCBCZXJsaW4sIEdlcm1hbnkiLiosChQKEglzgT720FOoRxHasA8z8yq-_BIUChIJAVkDPzdOqEcRcDteW0YgIQQ"
      },
      "to": {
        "name": "Friedrichstraße, Berlin, Germany",
        "place_id": "EiFGcmllZHJpY2hzdHJhw59lLCBCZXJsaW4sIEdlcm1hbnkiLiosChQKEglVWz7E2lGoRxHsjBgdN9ws7RIUChIJAVkDPzdOqEcRcDteW0YgIQQ"
      },
      "time": "2020-10-24 19:32",
      "vehicleId": "bicycling",
      "passengers": 1,
      "options": {
        "walking": {"distance": 6077, "duration": 4562},
        "driving": {"distance": 8048, "duration": 1107},
        "bicycling": {"distance": 7585, "duration": 1571},
        "transit": {"distance": 6860, "duration": 1671}
      }
    }


  public routeResults: Route[] = [
  ];

  constructor(private dataService: DataService, private routeService: RouteService, private resultService: ResultService, private iconService: IconService) {
  }

  ngOnInit(): void {
    if (this.resultService.getRoute()) {
      this.route = this.resultService.getRoute();
    }

    this.test();
  }

  test(): void {
    const activeVehicles = this.dataService.getActiveVehicles();
    for (const vehicle of activeVehicles) {
      this.route.vehicleId = vehicle.id;
      this.routeResults.push(JSON.parse(JSON.stringify(this.route)));
    }
    console.log(this.route);
  }

  saveRoute(route: Route): void {
    this.dataService.setRoute(JSON.parse(JSON.stringify(route)));
  }
}
