import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVacancyComponent } from './post-vacancy.component';

describe('PostVacancyComponent', () => {
  let component: PostVacancyComponent;
  let fixture: ComponentFixture<PostVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
