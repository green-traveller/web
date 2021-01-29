import {formatDate, Location} from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, NgZone } from '@angular/core';
import { MapsSdkService } from '../../services/maps-sdk.service';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { IconService } from '../../services/icon.service';
import { Search } from '../../models/search';
import {ResultService} from '../../services/result.service';
import { DataService } from '../../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteService } from '../../services/route.service';

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
  @ViewChild('stagedRouteModal') stagedRouteModal: any;

  data: Search;
  mapsSdkLoaded: boolean;
  toInputValid: boolean;
  fromInputValid: boolean;
  searching = false;

  constructor(
    private mapsSdkService: MapsSdkService,
    public changeDetectorRef: ChangeDetectorRef,
    public iconService: IconService,
    private resultService: ResultService,
    public dataService: DataService,
    public routeService: RouteService,
    private router: Router,
    private location: Location,
    private ngZone: NgZone,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.data = this.resultService.getSearch() || this.defaultData();
    this.toInputValid = typeof this.data.to !== 'undefined';
    this.fromInputValid = typeof this.data.from !== 'undefined';
    this.mapsSdkLoaded = this.mapsSdkService.isLoaded();
  }

  defaultData(): Search {
    return {
      to: undefined,
      from: undefined,
      passengerAmount: 1,
      timeMode: 'now',
      time: undefined
    };
  }

  ngAfterViewInit(): void {
    if (this.mapsSdkService.isLoaded()) {
      this.setUpMapsApiComponents();
    } else {
      this.mapsSdkService.onload(this.setUpMapsApiComponents.bind(this));
    }
    if (this.data.to) {
      this.toInput.nativeElement.value = this.data.to.name;
    }
    if (this.data.from) {
      this.fromInput.nativeElement.value = this.data.from.name;
    }
    if (this.dataService.getStagedRoute()) {
      this.openStagedRouteModalWindow();
    }
  }

  openStagedRouteModalWindow(): void {
    this.modalService.open(this.stagedRouteModal,  {ariaLabelledBy: 'modal-title', centered: true, backdrop: 'static', keyboard: false});
  }

  handleModalButton(option: string): void {
    switch (option) {
      case 'save': {
        this.dataService.saveStagedRoute();
        break;
      }
      case 'delete': {
        this.dataService.setStagedRoute(undefined);
        break;
      }
      case 'details': {
        this.resultService.setRoute(this.dataService.getStagedRoute());
        this.navigate('/results');
        break;
      }
    }
    this.modalService.dismissAll();
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
      this.data.from = autocompleteOrigin.getPlace();
      this.fromInputValid = true;
      this.fromInput.nativeElement.setCustomValidity('');
    });
    // dest
    const autocompleteDestination = new google.maps.places.Autocomplete(
      (this.toInput.nativeElement as HTMLInputElement),
      { componentRestrictions: { country: ['DE'] } }
    );
    autocompleteDestination.setFields(['place_id', 'name']);
    autocompleteDestination.addListener('place_changed', () => {
      this.data.to = autocompleteDestination.getPlace();
      this.toInputValid = true;
      this.toInput.nativeElement.setCustomValidity('');
    });

    // search button
    this.mapsSdkLoaded = true;
  }

  searchNotReady(): boolean {
    return !this.mapsSdkLoaded || !this.fromInputValid || !this.toInputValid;
  }

  searchRoutes(): void {
    if (this.searchNotReady()) {
      return;
    }
    this.searching = true;
    const dInput = this.dateInput;
    const tInput = this.timeInput;
    if (dInput && tInput) {
      this.data.time = new Date(`${this.dateInput.nativeElement.value}T${this.timeInput.nativeElement.value}`);
    } else {
      this.data.time = new Date();
    }
    this.mapsSdkService.searchRoute(this.data, searchResult => {
      this.searching = false;
      this.changeDetectorRef.detectChanges();
      if (searchResult.success) {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/results');
        });
      } else {
        window.alert(searchResult.message);
      }
    });
  }

  handleFromInputKeypress(): void {
    setTimeout(() => {
      if (this.data.from && this.data.from.name === this.fromInput.nativeElement.value) {
        this.fromInputValid = true;
        this.fromInput.nativeElement.setCustomValidity('');
      } else {
        this.fromInputValid = false;
        this.fromInput.nativeElement.setCustomValidity('Only selected input allowed.');
      }
    }, 0);
  }

  handleToInputKeypress(): void {
    setTimeout(() => {
      if (this.data.to && this.data.to.name === this.toInput.nativeElement.value) {
        this.toInputValid = true;
        this.toInput.nativeElement.setCustomValidity('');
      } else {
        this.toInputValid = false;
        this.toInput.nativeElement.setCustomValidity('Only selected input allowed.');
      }
    }, 0);
  }

  currentTimeString(): string {
    return formatDate(this.data.time || new Date(), 'HH:mm', 'en-US');
  }

  currentDateString(): string {
    return formatDate(this.data.time || new Date(), 'yyyy-MM-dd', 'en-US');
  }

  handleTimeModeChange(): void {
    if (this.data.timeMode === 'now') {
      this.data.time = new Date();
    }
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
    if (!this.passengerInput.nativeElement.validity.valid || this.data.passengerAmount < 1) {
      this.data.passengerAmount = 1;
    }
  }

  changePassengerAmount(n: number): void {
    this.data.passengerAmount += n;
    this.handlePassengerAmountChange();
  }

  navigate(s: string): void {
    this.router.navigateByUrl(s);
    this.location.replaceState(s);
  }
}
