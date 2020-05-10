import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryAutocompleteComponent } from './repository-autocomplete-service.component';

describe('ProjectAutocompleteComponent', () => {
  let component: RepositoryAutocompleteComponent;
  let fixture: ComponentFixture<RepositoryAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
