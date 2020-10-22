import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-initial-setup-name',
  templateUrl: './initial-setup-name.component.html',
  styleUrls: ['./initial-setup-name.component.css']
})
export class InitialSetupNameComponent implements OnInit {


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  clickChangeName(): void {
    const input = document.getElementById('inputName');
    const text = input.innerHTML;
    this.dataService.setUsername(text);
  }
}
