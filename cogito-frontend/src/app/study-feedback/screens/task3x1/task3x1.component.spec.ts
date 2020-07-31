import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task3x1Component } from './task3x1.component';

describe('Task3x1Component', () => {
  let component: Task3x1Component;
  let fixture: ComponentFixture<Task3x1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task3x1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task3x1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
