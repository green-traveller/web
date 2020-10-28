import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupNameComponent } from './initial-setup-name.component';

describe('InitialSetupNameComponent', () => {
  let component: InitialSetupNameComponent;
  let fixture: ComponentFixture<InitialSetupNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSetupNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
