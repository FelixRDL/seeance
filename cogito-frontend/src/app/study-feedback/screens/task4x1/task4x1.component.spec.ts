import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task4x1Component } from './task4x1.component';

describe('Task4x1Component', () => {
  let component: Task4x1Component;
  let fixture: ComponentFixture<Task4x1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task4x1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task4x1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
