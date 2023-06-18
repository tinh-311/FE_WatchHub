import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProductAlbertComponent } from './add-new-product-albert.component';

describe('AddNewProductAlbertComponent', () => {
  let component: AddNewProductAlbertComponent;
  let fixture: ComponentFixture<AddNewProductAlbertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewProductAlbertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewProductAlbertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
