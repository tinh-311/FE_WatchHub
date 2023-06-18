import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductAlbertComponent } from './edit-product-albert.component';

describe('EditProductAlbertComponent', () => {
  let component: EditProductAlbertComponent;
  let fixture: ComponentFixture<EditProductAlbertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductAlbertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductAlbertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
