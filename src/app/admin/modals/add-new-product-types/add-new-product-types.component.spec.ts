import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProductTypesComponent } from './add-new-product-types.component';

describe('AddNewProductTypesComponent', () => {
  let component: AddNewProductTypesComponent;
  let fixture: ComponentFixture<AddNewProductTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewProductTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewProductTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
