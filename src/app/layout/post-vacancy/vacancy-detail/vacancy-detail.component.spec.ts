import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDetailComponent } from './vacancy-detail.component';

describe('VacancyDetailComponent', () => {
  let component: VacancyDetailComponent;
  let fixture: ComponentFixture<VacancyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
