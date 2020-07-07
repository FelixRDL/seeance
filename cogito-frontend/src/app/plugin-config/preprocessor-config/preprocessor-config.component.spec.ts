import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessorConfigComponent } from './preprocessor-config.component';

describe('PreprocessorConfigComponent', () => {
  let component: PreprocessorConfigComponent;
  let fixture: ComponentFixture<PreprocessorConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreprocessorConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprocessorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
