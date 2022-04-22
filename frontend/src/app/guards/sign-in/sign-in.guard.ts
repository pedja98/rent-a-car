import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class SignInGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _signIn: SignInService
  ) { }

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    if (this._signIn.signedIn() && user.type === 'user') {
      return true
    }
    else {
      this._router.navigate(["*"])
      return false
    }
  }
}
