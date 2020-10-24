import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupTipsAndroidComponent } from './initial-setup-tips-android.component';

describe('InitialSetupTipsAndroidComponent', () => {
  let component: InitialSetupTipsAndroidComponent;
  let fixture: ComponentFixture<InitialSetupTipsAndroidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSetupTipsAndroidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSetupTipsAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
