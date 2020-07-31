import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task1_1Component } from './task1.component';

describe('Task1Component', () => {
  let component: Task1_1Component;
  let fixture: ComponentFixture<Task1_1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task1_1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task1_1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
