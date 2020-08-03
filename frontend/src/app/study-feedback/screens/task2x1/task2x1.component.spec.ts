import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task2x1Component } from './task2x1.component';

describe('Task2x1Component', () => {
  let component: Task2x1Component;
  let fixture: ComponentFixture<Task2x1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task2x1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task2x1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
