import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAutocompleteComponent } from './project-autocomplete.component';

describe('ProjectAutocompleteComponent', () => {
  let component: ProjectAutocompleteComponent;
  let fixture: ComponentFixture<ProjectAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
