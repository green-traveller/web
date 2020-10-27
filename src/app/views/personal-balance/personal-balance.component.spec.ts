import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBalanceComponent } from './personal-balance.component';

describe('PersonalBalanceComponent', () => {
  let component: PersonalBalanceComponent;
  let fixture: ComponentFixture<PersonalBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
