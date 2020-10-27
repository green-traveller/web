import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-initial-setup-nav',
  templateUrl: './initial-setup-nav.component.html',
  styleUrls: ['./initial-setup-nav.component.css']
})
export class InitialSetupNavComponent implements OnInit {

  @Input() dotsActive: number;
  @Input() nextPage: string;
  @Input() username: boolean;
  @Input() buttonName: string;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  handleButtonClick(): void {
    if (this.nextPage === '/initial-setup-tips') {
      this.dataservice.setSetupCompleted(true);
    }
    if (this.username === true) {
      const input = document.getElementById('inputName');
      const text = input.innerHTML;
      this.dataservice.setUsername(text);
    }
  }
}
