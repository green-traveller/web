import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-initial-setup-name',
  templateUrl: './initial-setup-name.component.html',
  styleUrls: ['./initial-setup-name.component.css']
})
export class InitialSetupNameComponent implements OnInit {

  username: string;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.username = this.dataservice.getUsername();
  }

  setFocusInput(): void {
    document.getElementById('inputName').focus();
    }
  }
