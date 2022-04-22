import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  constructor(private _http: HttpClient) { }

  getModeLS(): Observable<any> {
    return of(JSON.parse(localStorage.getItem("user")));
  }

  removeTokenLS(): Observable<any> {
    return of(localStorage.removeItem("token"));
  }

  removeModeLS(): Observable<any> {
    return of(localStorage.removeItem("user"));
  }

  getAllRents() {
    return this._http.post<any[]>(`${environment.apiUrl}/rents`, {})
  }

  getByCar() {
    return this._http.post<any[]>(`${environment.apiUrl}/rents/profit_by_car`, {})
  }

  getByDate() {
    return this._http.post<any[]>(`${environment.apiUrl}/rents/profit_by_date`, {})
  }

}
