import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUserLS() :Observable<any> {
    return of(JSON.parse(localStorage.getItem("user")));
  }

  removeTokenLS(): Observable<any> {
    return of(localStorage.removeItem("token"));
  }

  removeUserLS() :Observable<any> {
    return of(localStorage.removeItem("user"));
  }
  
  addUser(user: any) {
    return this._http.post<any>(`${environment.apiUrl}/add-user`, user)
  }

  addMod(user: any) {
    return this._http.post<any>(`${environment.apiUrl}/admin/add-mod`, user)
  }
}
