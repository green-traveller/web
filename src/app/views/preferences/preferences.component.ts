import { Component, OnInit } from '@angular/core';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  constructor(public iconService: IconService) { }

  ngOnInit(): void { }

}
