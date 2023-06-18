import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGlassComponent } from './product-glass.component';

describe('ProductGlassComponent', () => {
  let component: ProductGlassComponent;
  let fixture: ComponentFixture<ProductGlassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGlassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductGlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
