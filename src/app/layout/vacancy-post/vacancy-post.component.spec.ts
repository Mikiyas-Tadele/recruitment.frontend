import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyPostComponent } from './vacancy-post.component';

describe('VacancyPostComponent', () => {
  let component: VacancyPostComponent;
  let fixture: ComponentFixture<VacancyPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
