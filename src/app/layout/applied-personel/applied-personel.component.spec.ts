import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedPersonelComponent } from './applied-personel.component';

describe('AppliedPersonelComponent', () => {
  let component: AppliedPersonelComponent;
  let fixture: ComponentFixture<AppliedPersonelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedPersonelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
