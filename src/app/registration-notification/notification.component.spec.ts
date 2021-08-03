import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationNotificationComponent } from './registration-notification.component';

describe('RegistrationNotificationComponent', () => {
  let component: RegistrationNotificationComponent;
  let fixture: ComponentFixture<RegistrationNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
