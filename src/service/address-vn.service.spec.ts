import { TestBed } from '@angular/core/testing';

import { AddressVNService } from './address-vn.service';

describe('AddressVNService', () => {
  let service: AddressVNService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressVNService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
