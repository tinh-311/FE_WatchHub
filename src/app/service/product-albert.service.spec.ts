import { TestBed } from '@angular/core/testing';

import { ProductAlbertService } from './product-albert.service';

describe('ProductAlbertService', () => {
  let service: ProductAlbertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAlbertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
