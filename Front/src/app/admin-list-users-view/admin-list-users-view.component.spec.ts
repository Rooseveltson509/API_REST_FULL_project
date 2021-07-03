import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListUsersViewComponent } from './admin-list-users-view.component';

describe('AdminListUsersViewComponent', () => {
  let component: AdminListUsersViewComponent;
  let fixture: ComponentFixture<AdminListUsersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListUsersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
