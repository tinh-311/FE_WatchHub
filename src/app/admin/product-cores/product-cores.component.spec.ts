import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCoresComponent } from './product-cores.component';

describe('ProductCoresComponent', () => {
  let component: ProductCoresComponent;
  let fixture: ComponentFixture<ProductCoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
