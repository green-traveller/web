import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-initial-setup-name',
  templateUrl: './initial-setup-name.component.html',
  styleUrls: ['./initial-setup-name.component.css']
})
export class InitialSetupNameComponent implements OnInit {

  icons = {
    close: faTimes
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  clickChangeName(): void {
    const input = document.getElementById('inputName');
    const text = input.innerHTML;
    this.dataService.setUsername(text);
  }
}
