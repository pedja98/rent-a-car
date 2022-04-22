import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RentsService {

  constructor(private _http: HttpClient) { }

  getUserRents(username: string) {
    return this._http.post<any[]>(`${environment.apiUrl}/rents/user`, { username: username })
  }

  sendRent(rent: any) {
    return this._http.post<any>(`${environment.apiUrl}/rents/add-rent`, rent)
  }


  cancleRent(ID: number) {
    return this._http.post<any>(`${environment.apiUrl}/rents/cancle`, { ID })
  }
}
