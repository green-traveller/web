import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupTipsComponent } from './initial-setup-tips.component';

describe('InitialSetupTipsComponent', () => {
  let component: InitialSetupTipsComponent;
  let fixture: ComponentFixture<InitialSetupTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSetupTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
