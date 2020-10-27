import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-close-icon',
  templateUrl: './close-icon.component.html',
  styleUrls: ['./close-icon.component.css']
})
export class CloseIconComponent implements OnInit {

  icons = {
    close: faTimes
  };

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  setupCompleted(): void {
    this.dataservice.setSetupCompleted(true);
  }
}
