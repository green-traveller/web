import { formatDate } from '@angular/common';
import {Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { MapsSdkService } from '../../services/maps-sdk.service';
import { Router } from '@angular/router';
import {} from 'googlemaps';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.css']
})
export class SearchRouteComponent implements OnInit, AfterViewInit {

  @ViewChild('fromInput') fromInput: ElementRef;
  @ViewChild('toInput') toInput: ElementRef;
  @ViewChild('dateInput') dateInput: ElementRef;
  @ViewChild('timeInput') timeInput: ElementRef;
  @ViewChild('passengerInput') passengerInput: ElementRef;

  timeMode = 'now';
  passengerAmount = 1;
  from: google.maps.places.PlaceResult;
  to: google.maps.places.PlaceResult;
  mapsSdkLoaded: boolean;
  toInputValid = false;
  fromInputValid = false;
  searching = false;
  changeDetectorRef: ChangeDetectorRef;

  constructor(private mapsSdkService: MapsSdkService, changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit(): void {
    this.mapsSdkLoaded = this.mapsSdkService.isLoaded();
  }

  ngAfterViewInit(): void {
    if (this.mapsSdkService.isLoaded()) {
      this.setUpMapsApiComponents();
    } else {
      this.mapsSdkService.onload(this.setUpMapsApiComponents.bind(this));
    }
  }

  setUpMapsApiComponents(): void {
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete?hl=en_US#add-autocomplete
    const autocompleteOrigin = new google.maps.places.Autocomplete(
      (this.fromInput.nativeElement as HTMLInputElement),
      { componentRestrictions: { country: ['DE'] } }
    );
    // https://developers.google.com/maps/documentation/javascript/place-data-fields?hl=en_US
    autocompleteOrigin.setFields(['place_id', 'name']);
    // When the user selects an address from the drop-down
    google.maps.event.addListenerOnce(autocompleteOrigin, 'place_changed', () => {
      this.from = autocompleteOrigin.getPlace();
      this.fromInputValid = true;
    });

    // dest
    const autocompleteDestination = new google.maps.places.Autocomplete(
      (this.toInput.nativeElement as HTMLInputElement),
      { componentRestrictions: { country: ['DE'] } }
    );
    autocompleteDestination.setFields(['place_id', 'name']);
    autocompleteDestination.addListener('place_changed', () => {
      this.to = autocompleteDestination.getPlace();
      this.toInputValid = true;
    });

    // search button
    this.mapsSdkLoaded = true;
  }

  searchRoutes(): void {
    if (!this.mapsSdkLoaded || !this.fromInputValid || !this.toInputValid) {
      return;
    }
    this.searching = true;
    const route = {
      id: 'new',
      from: {
        name: this.from.name,
        place_id: this.from.place_id
      },
      to: {
        name: this.to.name,
        place_id: this.to.place_id
      },
      time: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en_US'),
      vehicleId: 'unknown',
      passengers: this.passengerAmount,
      options: {}
    };
    const dInput = this.dateInput;
    const tInput = this.timeInput;
    let customTime = new Date();
    if (dInput && tInput) {
      customTime = new Date(`${this.dateInput.nativeElement.value} ${this.timeInput.nativeElement.value}`);
    }
    this.mapsSdkService.searchRoute(route, this.timeMode, customTime, r => {
      this.searching = false;
      this.changeDetectorRef.detectChanges();
      if (Object.keys(r.options).length < 1) {
        window.alert('No results found.');
      } else {
        // TODO navigate to result view
        // this.router.navigateByUrl('/result');
      }
    });
  }

  handleFromInputKeypress(): void {
    this.fromInputValid = false;
  }

  handleToInputKeypress(): void {
    this.toInputValid = false;
  }

  currentTimeString(): string {
    return formatDate(new Date(), 'HH:mm', 'en-US');
  }

  currentDateString(): string {
    return formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

  handleTimeChange(): void {
    if (this.timeInput.nativeElement.value === '') {
      this.timeInput.nativeElement.value = this.currentTimeString();
    }
  }

  handleDateChange(): void {
    if (this.dateInput.nativeElement.value === '') {
      this.dateInput.nativeElement.value = this.currentDateString();
    }
  }

  handlePassengerAmountChange(): void {
    if (!this.passengerInput.nativeElement.validity.valid || this.passengerAmount < 1) {
      this.passengerAmount = 1;
    }
  }

  changePassengerAmount(n: number): void {
    this.passengerAmount += n;
    this.handlePassengerAmountChange();
  }
}
