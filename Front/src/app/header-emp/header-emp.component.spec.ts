import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEmpComponent } from './header-emp.component';

describe('HeaderEmpComponent', () => {
  let component: HeaderEmpComponent;
  let fixture: ComponentFixture<HeaderEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
