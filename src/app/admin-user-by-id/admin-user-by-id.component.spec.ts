import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserByIdComponent } from './admin-user-by-id.component';

describe('AdminUserByIdComponent', () => {
  let component: AdminUserByIdComponent;
  let fixture: ComponentFixture<AdminUserByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
