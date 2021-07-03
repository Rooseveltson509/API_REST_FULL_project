import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListEmpComponent } from './admin-list-emp.component';

describe('AdminListEmpComponent', () => {
  let component: AdminListEmpComponent;
  let fixture: ComponentFixture<AdminListEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
