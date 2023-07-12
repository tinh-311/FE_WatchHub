import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderDetailComponent } from './manage-order-detail.component';

describe('ManageOrderDetailComponent', () => {
  let component: ManageOrderDetailComponent;
  let fixture: ComponentFixture<ManageOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
