import { TestBed } from '@angular/core/testing';

import { SignInAdminGuard } from './sign-in-admin.guard';

describe('SignInAdminGuard', () => {
  let guard: SignInAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignInAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
