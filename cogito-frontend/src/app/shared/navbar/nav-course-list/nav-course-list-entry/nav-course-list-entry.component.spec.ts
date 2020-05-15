import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCourseListEntryComponent } from './nav-course-list-entry.component';

describe('NavCourseListEntryComponent', () => {
  let component: NavCourseListEntryComponent;
  let fixture: ComponentFixture<NavCourseListEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavCourseListEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCourseListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
