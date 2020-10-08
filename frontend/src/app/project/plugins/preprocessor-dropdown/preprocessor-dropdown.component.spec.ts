import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessorDropdownComponent } from './preprocessor-dropdown.component';

describe('PreprocessorDropdownComponent', () => {
  let component: PreprocessorDropdownComponent;
  let fixture: ComponentFixture<PreprocessorDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreprocessorDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprocessorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
