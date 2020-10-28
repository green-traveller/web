import {} from 'googlemaps';

export interface Search {
  from: google.maps.places.PlaceResult;
  to: google.maps.places.PlaceResult;
  passengerAmount: number;
  timeMode: string;
  time: Date;
}
