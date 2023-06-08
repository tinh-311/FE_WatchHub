import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubCategoryComponent } from './edit-sub-category.component';

describe('EditSubCategoryComponent', () => {
  let component: EditSubCategoryComponent;
  let fixture: ComponentFixture<EditSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
