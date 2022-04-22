import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment"

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private _http: HttpClient) { }

  signIn(user: any) {
    return this._http.post<any>(`${environment.apiUrl}/users`, user)
  }

  signedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token
  }
}
