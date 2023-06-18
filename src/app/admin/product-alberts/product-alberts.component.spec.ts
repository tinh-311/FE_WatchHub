import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAlbertsComponent } from './product-alberts.component';

describe('ProductAlbertsComponent', () => {
  let component: ProductAlbertsComponent;
  let fixture: ComponentFixture<ProductAlbertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAlbertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAlbertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
