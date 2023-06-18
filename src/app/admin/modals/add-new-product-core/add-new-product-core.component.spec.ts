import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProductCoreComponent } from './add-new-product-core.component';

describe('AddNewProductCoreComponent', () => {
  let component: AddNewProductCoreComponent;
  let fixture: ComponentFixture<AddNewProductCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewProductCoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewProductCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
