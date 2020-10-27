import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousRoutesComponent } from './previous-routes.component';

describe('PreviousRoutesComponent', () => {
  let component: PreviousRoutesComponent;
  let fixture: ComponentFixture<PreviousRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
