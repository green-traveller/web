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
    const importElement = document.createElement('input');
    importElement.setAttribute('type', 'file');
    importElement.setAttribute('accept', '.GreenTraveller');
    importElement.setAttribute('multiple', 'false');
    importElement.click();
    importElement.addEventListener('change', () => {
      const file = importElement.files[0];
      if (file !== undefined) {
        const fr = new FileReader();
        fr.onload = () => {
          try {
            // @ts-ignore
            const result = JSON.parse(fr.result);
            if (!result.data) {
              this.alert = ALERTS.import.failure;
              throw new Error('Restore: No data attribute available.');
            }
            this.dataService.setStorageManually(result.data);
            this.alert = ALERTS.import.success;
          } catch (e) {
            console.log(e);
            this.alert = ALERTS.import.failure;
          }
        };
        fr.readAsText(file);
      }
      importElement.remove();
    });
  }

  export(): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ data: this.dataService.getStorage() }));
    const exportElement = document.createElement('a');
    exportElement.setAttribute('href', dataStr);
    const exportName = 'Export_' + new Date().toISOString().split('T')[0] + '.GreenTraveller';
    exportElement.setAttribute('download', exportName);
    exportElement.click();
    exportElement.remove();
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
