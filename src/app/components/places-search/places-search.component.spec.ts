import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesSearchComponent } from './places-search.component';

describe('PlacesSearchComponent', () => {
  let component: PlacesSearchComponent;
  let fixture: ComponentFixture<PlacesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
