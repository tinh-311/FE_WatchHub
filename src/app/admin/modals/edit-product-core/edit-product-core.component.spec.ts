import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductCoreComponent } from './edit-product-core.component';

describe('EditProductCoreComponent', () => {
  let component: EditProductCoreComponent;
  let fixture: ComponentFixture<EditProductCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductCoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
