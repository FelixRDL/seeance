import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task3x2Component } from './task3x2.component';

describe('Task3x2Component', () => {
  let component: Task3x2Component;
  let fixture: ComponentFixture<Task3x2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task3x2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task3x2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
