import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSearchResultsComponent } from './route-search-results.component';

describe('RouteSearchResultsComponent', () => {
  let component: RouteSearchResultsComponent;
  let fixture: ComponentFixture<RouteSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
