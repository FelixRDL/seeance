import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFeedbackComponent } from './study-feedback.component';

describe('StudyFeedbackComponent', () => {
  let component: StudyFeedbackComponent;
  let fixture: ComponentFixture<StudyFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
