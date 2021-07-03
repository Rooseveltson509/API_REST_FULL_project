import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailPasswordSentComponent } from './mail-password-sent.component';

describe('MailPasswordSentComponent', () => {
  let component: MailPasswordSentComponent;
  let fixture: ComponentFixture<MailPasswordSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailPasswordSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailPasswordSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
