import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewEmpComponent } from './admin-new-emp.component';

describe('AdminNewEmpComponent', () => {
  let component: AdminNewEmpComponent;
  let fixture: ComponentFixture<AdminNewEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
