import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/Items';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  items: Item[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.dataService.getItems()
      .subscribe(items => this.items = items);
  }

  addItem(): void {
    const item: Item = {
      id: '5',
      name: 'Hello'
    };
    this.dataService.addItem(item);
  }

}
