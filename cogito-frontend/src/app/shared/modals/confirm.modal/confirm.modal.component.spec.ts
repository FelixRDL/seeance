import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirm.ModalComponent } from './confirm.modal.component';

describe('Confirm.ModalComponent', () => {
  let component: Confirm.ModalComponent;
  let fixture: ComponentFixture<Confirm.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Confirm.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Confirm.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
