import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsSdkService {

  url = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=';
  key = environment.apiKey;
  loaded = false;
  toExecute = [];

  constructor() {
    const element = document.createElement('script');
    element.src = this.url + this.key;
    element.type = 'text/javascript';
    element.async = true;
    element.onload = () => {
      console.log('Maps SDK ready.');
      for (const fn of this.toExecute) {
        fn();
      }
    };
    document.getElementsByTagName('head')[0].appendChild(element);
  }

  onload(fn: () => void): void {
    if (this.loaded) {
      fn();
    } else {
      this.toExecute.push(fn);
    }
  }
}
