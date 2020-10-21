import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {} from 'googlemaps';
import {MapsSdkService} from '../../services/maps-sdk.service';
import PlaceResult = google.maps.places.PlaceResult;


@Component({
  selector: 'app-places-search',
  templateUrl: './places-search.component.html',
  styleUrls: ['./places-search.component.css']
})
export class PlacesSearchComponent implements OnInit, AfterViewInit {

  @Input() labelText: string;
  autocompleteOrigin: google.maps.places.Autocomplete;
  autocompleteDestination: google.maps.places.Autocomplete;
  origin: PlaceResult = { name: 'Ernst-Reuter-Platz, Ernst-Reuter-Platz, Berlin, Germany', place_id: 'ChIJreRG9xxRqEcR-Mo9Zk4DQ2Q' };
  destination: PlaceResult = { name: 'HWR Berlin - Haus 5, Alt-Friedrichsfelde, Berlin, Germany', place_id: 'ChIJD70Jp0pJqEcRe9sSSbbRPp8' };
  directionsService: google.maps.DirectionsService;
  routeDistance: string;
  routeDuration: string;

  constructor(private mapsSdkService: MapsSdkService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapsSdkService.onload(this.initAutocomplete.bind(this));
    this.mapsSdkService.onload(this.initDirectionsService.bind(this));
  }

  initAutocomplete(): void {
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete?hl=en_US#add-autocomplete
    this.autocompleteOrigin = new google.maps.places.Autocomplete(
      document.getElementById('autocompleteOrigin') as HTMLInputElement,
      { componentRestrictions: { country: ['DE'] } }
    );
    // https://developers.google.com/maps/documentation/javascript/place-data-fields?hl=en_US
    this.autocompleteOrigin.setFields(['place_id', 'name']);
    // When the user selects an address from the drop-down
    this.autocompleteOrigin.addListener('place_changed', () => this.origin = this.autocompleteOrigin.getPlace());

    // dest
    this.autocompleteDestination = new google.maps.places.Autocomplete(
      document.getElementById('autocompleteDestination') as HTMLInputElement,
      { componentRestrictions: { country: ['DE'] } }
    );
    this.autocompleteDestination.setFields(['place_id', 'name']);
    this.autocompleteDestination.addListener('place_changed', () => this.destination = this.autocompleteDestination.getPlace());
  }

  initDirectionsService(): void {
    this.directionsService = new google.maps.DirectionsService();
  }

  calcRoute(): void {
    const request = {
      origin: { placeId: this.origin.place_id },
      destination: { placeId: this.destination.place_id },
      travelMode: 'DRIVING'
    };
    console.log('Calculating...');
    // @ts-ignore
    this.directionsService.route(request, (result, status) => {
      this.routeDistance = result.routes[0].legs[0].distance.text;
      this.routeDuration = result.routes[0].legs[0].duration.text;
      console.log(result, result.routes[0].legs[0].distance, this.routeDistance);
    });
  }
}
