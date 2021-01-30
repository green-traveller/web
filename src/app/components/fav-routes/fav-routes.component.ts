import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-fav-routes',
  templateUrl: './fav-routes.component.html',
  styleUrls: ['./fav-routes.component.css']
})
export class FavRoutesComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public iconService: IconService
  ) { }

  ngOnInit(): void {
  }

}
