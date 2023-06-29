import { TestBed } from '@angular/core/testing';

import { AuthenGuard } from './authen.guard';

describe('AuthenGuard', () => {
  let guard: AuthenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
