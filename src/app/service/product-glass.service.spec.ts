import { TestBed } from '@angular/core/testing';

import { ProductGlassService } from './product-glass.service';

describe('ProductGlassService', () => {
  let service: ProductGlassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGlassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
