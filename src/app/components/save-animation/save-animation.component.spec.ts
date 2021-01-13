import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAnimationComponent } from './save-animation.component';

describe('SaveAnimationComponent', () => {
  let component: SaveAnimationComponent;
  let fixture: ComponentFixture<SaveAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
