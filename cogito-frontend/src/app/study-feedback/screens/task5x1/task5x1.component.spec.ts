import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task5x1Component } from './task5x1.component';

describe('Task5x1Component', () => {
  let component: Task5x1Component;
  let fixture: ComponentFixture<Task5x1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task5x1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task5x1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
