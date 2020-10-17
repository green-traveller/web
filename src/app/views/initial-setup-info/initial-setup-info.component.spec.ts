import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupInfoComponent } from './initial-setup-info.component';

describe('InitialSetupInfoComponent', () => {
  let component: InitialSetupInfoComponent;
  let fixture: ComponentFixture<InitialSetupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSetupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
