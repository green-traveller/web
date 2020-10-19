import { Component, OnInit } from '@angular/core';

import { Alert } from '../../../models/alert';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.component.html',
  styleUrls: ['./manage-data.component.css']
})
export class ManageDataComponent implements OnInit {

  alert: Alert;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  import(): void {
    this.alert = ALERTS.import.success;
  }

  export(): void {
    this.alert = ALERTS.export.success;
  }

  reset(): void {
    if (window.confirm('Resetting your app and removing data.\nAre you sure?')) {
      this.dataService.resetStorage();
      this.alert = ALERTS.reset.success;
    } else {
      this.alert = ALERTS.reset.cancel;
    }
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
      message: 'Failed to import your data.',
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
  },
  reset: {
    success: {
      type: 'success',
      message: 'Successfully reset.',
    },
    cancel: {
      type: 'info',
      message: 'Reset cancelled.',
    }
  }
};
