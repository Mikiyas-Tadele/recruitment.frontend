import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantHeaderComponent } from './applicant-header.component';

describe('ApplicantHeaderComponent', () => {
  let component: ApplicantHeaderComponent;
  let fixture: ComponentFixture<ApplicantHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
