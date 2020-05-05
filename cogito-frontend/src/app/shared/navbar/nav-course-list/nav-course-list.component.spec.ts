import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCourseListComponent } from './nav-course-list.component';

describe('NavCourseListComponent', () => {
  let component: NavCourseListComponent;
  let fixture: ComponentFixture<NavCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
