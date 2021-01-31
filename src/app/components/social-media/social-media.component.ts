import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  @Input() co2PieChartCanvas: HTMLCanvasElement;
  @Output() imageExportRequested = new EventEmitter<boolean>();

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

  drawProgressBar(): any {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 100;
    const context = canvas.getContext('2d');
  }

  drawCanvas(): any {
//     /*const canvas = document.createElement('canvas');
//     canvas.width = 100;
//     canvas.height = 100;
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'red';
//     ctx.fillRect(0, 0, 100, 100);*/

//     // document.body.appendChild(img);

//     // const item = this.canvas.nativeElement as HTMLCanvasElement;
//     // console.log(item);
//   //    const canvas = item.toDataURL('image/png');
//     // console.log(canvas);

//     // const ctx = item.getContext('2d');
//     // ctx.font = "30px Arial";
//     // ctx.fillText('Hello World', 10, 50);

//     // const img = document.createElement('img');
//     // img.src = item.toDataURL('image/png');

//     console.log(img.src.lastIndexOf(','));
//     console.log(img.src.substring(22));

//     return img.src.substring(22);

  }

  handleButtonClick(): void {
    // console.log('Start in handleButtonClick() in SocialMediaComponent');
    this.imageExportRequested.emit(true);
    // console.log(this.co2PieChartCanvas.toDataURL('image/png'));
    // console.log('Finish in handleButtonClick() in SocialMediaComponent');
    // const file = new File([this.b64toBlob(this.drawCanvas())], 'image.png', { type: 'image/png'});
    /*const file = new File(
      [this.b64toBlob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')],
      'image.gif',
      { type: 'image/gif' }
      );*/
    // console.log(file);
    // // @ts-ignore
    // if (navigator.canShare) {
    //   navigator.share({
    //     // @ts-ignore
    //     files: [file],
    //     title: 'Test',
    //     url: 'www.google.de'
    //   });
    // } else {
    //   this.export();
    // }
  }
}
