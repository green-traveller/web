import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupNavComponent } from './initial-setup-nav.component';

describe('InitialSetupNavComponent', () => {
  let component: InitialSetupNavComponent;
  let fixture: ComponentFixture<InitialSetupNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSetupNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
