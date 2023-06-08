import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSubCategoryComponent } from './add-new-sub-category.component';

describe('AddNewSubCategoryComponent', () => {
  let component: AddNewSubCategoryComponent;
  let fixture: ComponentFixture<AddNewSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
