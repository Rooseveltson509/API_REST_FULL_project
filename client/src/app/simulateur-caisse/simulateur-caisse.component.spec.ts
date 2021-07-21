import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateurCaisseComponent } from './simulateur-caisse.component';

describe('SimulateurCaisseComponent', () => {
  let component: SimulateurCaisseComponent;
  let fixture: ComponentFixture<SimulateurCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulateurCaisseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulateurCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
