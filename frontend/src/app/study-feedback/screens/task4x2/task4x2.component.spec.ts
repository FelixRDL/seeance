import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task4x2Component } from './task4x2.component';

describe('Task4x2Component', () => {
  let component: Task4x2Component;
  let fixture: ComponentFixture<Task4x2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task4x2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task4x2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
