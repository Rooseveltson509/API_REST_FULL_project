import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConnexionComponent } from './register-connexion.component';

describe('RegisterConnexionComponent', () => {
  let component: RegisterConnexionComponent;
  let fixture: ComponentFixture<RegisterConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterConnexionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
