import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyVacancyComponent } from './apply-vacancy.component';

describe('ApplyVacancyComponent', () => {
  let component: ApplyVacancyComponent;
  let fixture: ComponentFixture<ApplyVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
