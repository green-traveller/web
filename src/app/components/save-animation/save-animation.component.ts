import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-save-animation',
  templateUrl: './save-animation.component.html',
  styleUrls: ['./save-animation.component.css']
})
export class SaveAnimationComponent implements AfterViewInit {

  @ViewChild('content') content: ElementRef;
  @Input() afterAnimation: () => void;

  emojis = [
    {text: '🌳', timeout: 250},
    {text: '😉', timeout: 250},
    {text: '🙌', timeout: 300}
  ];
  emojiIndex = 0;
  emojiElement: HTMLDivElement;

  constructor(private modalService: NgbModal) { }

  ngAfterViewInit(): void {
    this.startAnimation();
  }

  startAnimation(): void {
    this.modalService.open(this.content, { centered: true, backdrop: 'static' });
    this.emojiElement = document.querySelector('.emoji');
    this.nextEmoji();
  }

  nextEmoji(): void  {
    const emoji = this.emojis[this.emojiIndex];
    if (typeof emoji === 'undefined') {
      this.modalService.dismissAll();
      this.afterAnimation();
      return;
    }
    this.emojiElement.innerText = emoji.text;
    this.emojiIndex += 1;
    setTimeout(this.nextEmoji.bind(this), emoji.timeout);
  }
}
