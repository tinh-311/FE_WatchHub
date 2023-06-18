import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProductGlassComponent } from './add-new-product-glass.component';

describe('AddNewProductGlassComponent', () => {
  let component: AddNewProductGlassComponent;
  let fixture: ComponentFixture<AddNewProductGlassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewProductGlassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewProductGlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
