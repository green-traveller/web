import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-save-animation',
  templateUrl: './save-animation.component.html',
  styleUrls: ['./save-animation.component.css']
})
export class SaveAnimationComponent implements OnInit {

  emojis = [{text: '🌳', timeout: 250}, {text: '😉', timeout: 250}, {text: '🙌', timeout: 300}]

  emojiIndex = 0

  emojiElement: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
    this.emojiElement = document.querySelector('.emoji');
    this.startAnimation()
  }

  startAnimation(): void  {
    const emoji = this.emojis[this.emojiIndex]
    if (typeof emoji === 'undefined') { 
      return
    }
    this.emojiElement.innerText = emoji.text;
    this.emojiIndex += 1;
    setTimeout(this.startAnimation.bind(this), emoji.timeout)
  }
}
