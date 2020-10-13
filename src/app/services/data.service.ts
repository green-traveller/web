import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable, of } from 'rxjs';

import { Item } from '../models/Items';

const STORAGE_KEY = 'TEST';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  items: Item[];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public getItems(): Observable<Item[]> {
    this.items = this.storage.get(STORAGE_KEY) || [];
    return of(this.items);
  }

  public addItem(item: Item): void {
    this.items.push(item);
    this.storage.set(STORAGE_KEY, this.items);
  }
}
