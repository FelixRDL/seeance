import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisConfigComponent } from './analysis-config.component';

describe('AnalysisConfigComponent', () => {
  let component: AnalysisConfigComponent;
  let fixture: ComponentFixture<AnalysisConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
