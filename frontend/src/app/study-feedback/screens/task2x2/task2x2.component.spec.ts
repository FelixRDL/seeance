import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task2x2Component } from './task2x2.component';

describe('Task2x2Component', () => {
  let component: Task2x2Component;
  let fixture: ComponentFixture<Task2x2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task2x2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task2x2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
