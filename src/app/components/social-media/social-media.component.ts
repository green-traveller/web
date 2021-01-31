import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { setTokenSourceMapRange } from 'typescript';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  private _co2PieChartCanvas: HTMLCanvasElement;

  @Input() set co2PieChartCanvas(value: HTMLCanvasElement) {
    if (this._co2PieChartCanvas !== value) {
      this._co2PieChartCanvas = value;
      this.socialMediaShare();
    }
  }

  @Output() imageExportRequested = new EventEmitter<boolean>();

  constructor() { }

  buttonName: string;

  ngOnInit(): void {
    this.buttonName = 'Social Media';
  }


  // tslint:disable-next-line: typedef
  b64toBlob(b64Data) {
    const contentType = '';
    const sliceSize = 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  export(imageSource): void {
    const dataStr = imageSource;
    const exportElement = document.createElement('a');
    exportElement.setAttribute('href', dataStr);
    const exportName = 'image.png';
    exportElement.setAttribute('download', exportName);
    exportElement.click();
    exportElement.remove();
  }

  drawProgressBar(): any {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 100;
    const context = canvas.getContext('2d');
  }

  socialMediaShare(): void {
    const img = document.createElement('img');
    img.src = this._co2PieChartCanvas.toDataURL('image/png');
    const file = new File([this.b64toBlob(img.src.substring(22))],
      'image.png',
      { type: 'image/png' }
      );
    // @ts-ignore
    if (navigator.canShare) {
      navigator.share({
      // @ts-ignore
      files: [file],
      title: '',
      url: ''
      });
    } else {
      this.export(img.src);
    }
  }

  // handleButtonClick(): void {
  // }
}
