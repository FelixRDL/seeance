import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreprocessorModalComponent } from './add-preprocessor-modal.component';

describe('AddPreprocessorModalComponent', () => {
  let component: AddPreprocessorModalComponent;
  let fixture: ComponentFixture<AddPreprocessorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPreprocessorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreprocessorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
