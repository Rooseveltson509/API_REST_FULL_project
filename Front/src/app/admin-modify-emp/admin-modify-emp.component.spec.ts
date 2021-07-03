import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyEmpComponent } from './admin-modify-emp.component';

describe('AdminModifyEmpComponent', () => {
  let component: AdminModifyEmpComponent;
  let fixture: ComponentFixture<AdminModifyEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModifyEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModifyEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
