import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantForWrittenExamComponent } from './applicant-for-written-exam.component';

describe('ApplicantForWrittenExamComponent', () => {
  let component: ApplicantForWrittenExamComponent;
  let fixture: ComponentFixture<ApplicantForWrittenExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantForWrittenExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantForWrittenExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
