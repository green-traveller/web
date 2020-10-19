import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDataComponent } from './manage-data.component';

describe('ManageDataComponent', () => {
  let component: ManageDataComponent;
  let fixture: ComponentFixture<ManageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
