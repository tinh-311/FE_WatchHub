import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgReviewComponent } from './img-review.component';

describe('ImgReviewComponent', () => {
  let component: ImgReviewComponent;
  let fixture: ComponentFixture<ImgReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
