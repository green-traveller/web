import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgbModal, NgbModalConfig, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content-component',
  template: `
    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body text-center initial-setup-name__text--qr">
      <div>
        Glad to see that you are interested!
      </div>
      <div>
        For the best experience we suggest, that you use this app on a smartphone. Just scan the QR Code.
      </div>
      <div class="initial-setup-name__image">
        <img alt="Green Traveller QR" src="assets/qr.png" height="128" width="128">
      </div>
      <div>
        or go to
      </div>
      <div>
        www.green-traveller.github.io
      </div>
    </div>
  `
})

export class AppModalContentComponent {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-initial-setup-name',
  templateUrl: './initial-setup-name.component.html',
  styleUrls: ['./initial-setup-name.component.css']
})

export class InitialSetupNameComponent implements OnInit {

  @ViewChild('inputUsername') inputUsername: string;

  username: string;

  constructor(private dataservice: DataService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.username = this.dataservice.getUsername();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    if (this.checkMobileDevice() !== true) {
      this.open();
    }
  }

  checkMobileDevice(): boolean {
    if (screen.width < 500 ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i)) {
          return true;
        }
    return false;
  }

  open(): void {
    const modalRef = this.modalService.open(AppModalContentComponent);
  }

  handleUsernameInput(): void {
    const username = this.inputUsername;
    if (username !== '') {
      this.dataservice.setUsername(username);
    }
  }
}
