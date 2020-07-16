import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTileComponent } from './analysis-tile.component';

describe('AnalysisTileComponent', () => {
  let component: AnalysisTileComponent;
  let fixture: ComponentFixture<AnalysisTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
