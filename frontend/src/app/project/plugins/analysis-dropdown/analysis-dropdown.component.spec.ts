import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisDropdownComponent } from './analysis-dropdown.component';

describe('AnalysisDropdownComponent', () => {
  let component: AnalysisDropdownComponent;
  let fixture: ComponentFixture<AnalysisDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
