import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalysisModalComponent } from './add-analysis-modal.component';

describe('AddAnalysisModalComponent', () => {
  let component: AddAnalysisModalComponent;
  let fixture: ComponentFixture<AddAnalysisModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnalysisModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnalysisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
