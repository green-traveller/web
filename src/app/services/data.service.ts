import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'TEST';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  items: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.getItems();
    this.addItem('Christopher');
  }

  public getItems(): any {
    this.items = this.storage.get(STORAGE_KEY) || [];
    return this.items;
  }

  public addItem(item: any): void {
    this.items.push(item);
    this.storage.set(STORAGE_KEY, this.items);
  }
}
