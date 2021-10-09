import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsForInterviewComponent } from './applicants-for-interview.component';

describe('ApplicantsForInterviewComponent', () => {
  let component: ApplicantsForInterviewComponent;
  let fixture: ComponentFixture<ApplicantsForInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantsForInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantsForInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
