import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductTypesComponent } from './edit-product-types.component';

describe('EditProductTypesComponent', () => {
  let component: EditProductTypesComponent;
  let fixture: ComponentFixture<EditProductTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
