import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInService } from '../sign-in/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    let auth =  this._injector.get(SignInService);
    if(auth.signedIn()) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${auth.getToken()}` }
      });
    }
    return next.handle(req);
  }
}
