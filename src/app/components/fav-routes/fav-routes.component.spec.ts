import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavRoutesComponent } from './fav-routes.component';

describe('FavRoutesComponent', () => {
  let component: FavRoutesComponent;
  let fixture: ComponentFixture<FavRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
