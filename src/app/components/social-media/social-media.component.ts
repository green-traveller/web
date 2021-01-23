import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  constructor() { }

  buttonName: string;
  nextPage: string;

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

  export(): void {
    const dataStr = 'data:image/gif;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const exportElement = document.createElement('a');
    exportElement.setAttribute('href', dataStr);
    const exportName = 'image.gif';
    exportElement.setAttribute('download', exportName);
    exportElement.click();
    exportElement.remove();
  }

  handleButtonClick(): void {
    const file = new File(
      [this.b64toBlob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')],
     'image.gif', {
      type: 'image/gif',
    });

    // @ts-ignore
    if (navigator.canShare) {
      navigator.share({
        // @ts-ignore
        files: [file],
        title: 'Test',
        url: 'www.google.de'
      });
    } else {
      this.export();
    }
  }
}
