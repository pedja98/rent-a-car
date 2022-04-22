import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignInService } from 'src/app/services/sign-in/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class SignInModeGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _signIn: SignInService
  ) { }

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    if (this._signIn.signedIn() && user.type === 'moderator') {
      return true
    }
    else {
      this._router.navigate(["*"])
      return false
    }
  }
}
