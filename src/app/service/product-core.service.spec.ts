import { TestBed } from '@angular/core/testing';

import { ProductCoreService } from './product-core.service';

describe('ProductCoreService', () => {
  let service: ProductCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
