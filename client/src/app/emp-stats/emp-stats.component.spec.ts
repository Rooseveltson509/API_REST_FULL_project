import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpStatsComponent } from './emp-stats.component';

describe('EmpStatsComponent', () => {
  let component: EmpStatsComponent;
  let fixture: ComponentFixture<EmpStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
