import { Component, OnInit } from '@angular/core';

import { Alert } from '../../../models/alert';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.component.html',
  styleUrls: ['./manage-data.component.css']
})
export class ManageDataComponent implements OnInit {

  alert: Alert;

  constructor() { }

  ngOnInit(): void {
  }

  import(): void {
    this.alert = ALERTS.import.success;
  }

  export(): void {
    this.alert = ALERTS.export.success;
  }

  closeAlert(): void {
    this.alert = undefined;
  }
}

const ALERTS = {
  import: {
    success: {
      type: 'success',
      message: 'Successfully imported your data.',
    },
    failure: {
      type: 'danger',
      message: 'This is a danger alert',
    }
  },
  export: {
    success: {
      type: 'success',
      message: 'Successfully exported your data.',
    },
    failure: {
      type: 'danger',
      message: 'This is a danger alert',
    }
  }
};
