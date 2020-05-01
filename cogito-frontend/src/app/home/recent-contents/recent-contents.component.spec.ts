import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentContentsComponent } from './recent-contents.component';

describe('RecentContentsComponent', () => {
  let component: RecentContentsComponent;
  let fixture: ComponentFixture<RecentContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
