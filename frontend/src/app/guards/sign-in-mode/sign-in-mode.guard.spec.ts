import { TestBed } from '@angular/core/testing';

import { SignInModeGuard } from './sign-in-mode.guard';

describe('SignInModeGuard', () => {
  let guard: SignInModeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignInModeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
