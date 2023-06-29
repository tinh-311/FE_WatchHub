import { TestBed } from '@angular/core/testing';

import { PaymentMenthodService } from './payment-menthod.service';

describe('PaymentMenthodService', () => {
  let service: PaymentMenthodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentMenthodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
