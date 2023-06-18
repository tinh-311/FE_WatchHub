import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductGlassComponent } from './edit-product-glass.component';

describe('EditProductGlassComponent', () => {
  let component: EditProductGlassComponent;
  let fixture: ComponentFixture<EditProductGlassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductGlassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductGlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
