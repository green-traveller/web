import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FavRoute } from 'src/app/models/route-fav';
import { DataService } from 'src/app/services/data.service';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-fav-routes',
  templateUrl: './fav-routes.component.html',
  styleUrls: ['./fav-routes.component.css']
})


export class FavRoutesComponent implements OnInit {

  
@Output('set-search-data') setSearchDataEvent: EventEmitter<FavRoute> = new EventEmitter<FavRoute>();

  constructor(
    public dataService: DataService,
    public iconService: IconService
  ) { }

  ngOnInit(): void {
  }

  searchFavRoute(favRoute: FavRoute): void {
    this.setSearchDataEvent.emit(favRoute);
  }

}
