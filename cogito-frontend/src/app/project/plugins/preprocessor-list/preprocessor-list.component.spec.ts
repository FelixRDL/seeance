import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessorListComponent } from './preprocessor-list.component';

describe('PreprocessorListComponent', () => {
  let component: PreprocessorListComponent;
  let fixture: ComponentFixture<PreprocessorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreprocessorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprocessorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
