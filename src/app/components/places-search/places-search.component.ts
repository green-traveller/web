import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {} from 'googlemaps';
import {MapsSdkService} from '../../services/maps-sdk.service';


@Component({
  selector: 'app-places-search',
  templateUrl: './places-search.component.html',
  styleUrls: ['./places-search.component.css']
})
export class PlacesSearchComponent implements OnInit, AfterViewInit {

  @Input() labelText: string;
  autocomplete: google.maps.places.Autocomplete;

  constructor(private mapsSdkService: MapsSdkService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapsSdkService.onload(this.initAutocomplete.bind(this));
  }

  initAutocomplete(): void {
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete?hl=en_US#add-autocomplete
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
      { componentRestrictions: { country: ['DE'] } }
    );
    // https://developers.google.com/maps/documentation/javascript/place-data-fields?hl=en_US
    this.autocomplete.setFields(['place_id', 'name']);
    // When the user selects an address from the drop-down
    this.autocomplete.addListener('place_changed', () => console.log(this.autocomplete.getPlace()));
  }
}
