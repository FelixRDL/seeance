import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UeqComponent } from './ueq.component';

describe('UeqComponent', () => {
  let component: UeqComponent;
  let fixture: ComponentFixture<UeqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
