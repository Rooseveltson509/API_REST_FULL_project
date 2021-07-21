import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpListUsersViewComponent } from './emp-list-users-view.component';

describe('EmpListUsersViewComponent', () => {
  let component: EmpListUsersViewComponent;
  let fixture: ComponentFixture<EmpListUsersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpListUsersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpListUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
