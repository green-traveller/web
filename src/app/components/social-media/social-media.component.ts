import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  private _chartCanvas: HTMLCanvasElement;

  @Input() set chartCanvas(value: HTMLCanvasElement) {
    if (this._chartCanvas !== value) {
      this._chartCanvas = value;
      this.socialMediaShare();
    }
  }

  @Output() imageExportRequested = new EventEmitter<boolean>();

  constructor(public iconService: IconService) { }

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

  addTextToCanvas(): void {
  }

  drawProgressBar(): any {
  }

  socialMediaShare(): void {
    const img = document.createElement('img');
    img.src = this._chartCanvas.toDataURL('image/png');
    console.log(img.src);
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
}
