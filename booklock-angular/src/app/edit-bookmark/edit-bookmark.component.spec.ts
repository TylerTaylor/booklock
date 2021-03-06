import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookmarkComponent } from './edit-bookmark.component';

describe('EditBookmarkComponent', () => {
  let component: EditBookmarkComponent;
  let fixture: ComponentFixture<EditBookmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
