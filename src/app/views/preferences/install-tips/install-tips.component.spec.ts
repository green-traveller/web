import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallTipsComponent } from './install-tips.component';

describe('InstallTipsComponent', () => {
  let component: InstallTipsComponent;
  let fixture: ComponentFixture<InstallTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
