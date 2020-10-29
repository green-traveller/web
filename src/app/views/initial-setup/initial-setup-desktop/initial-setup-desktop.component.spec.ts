import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupDesktopComponent } from './initial-setup-desktop.component';

describe('InitialSetupDesktopComponent', () => {
  let component: InitialSetupDesktopComponent;
  let fixture: ComponentFixture<InitialSetupDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSetupDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
