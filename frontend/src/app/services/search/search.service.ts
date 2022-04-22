import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _http: HttpClient) { }

  getCars() {
    const httpHeaders = new HttpHeaders()
    httpHeaders.append('Content-Type', 'application/json')
    return this._http.get<any[]>(`${environment.apiUrl}/cars`, { headers: httpHeaders })
  }

  searchCars(params) {
    const httpHeaders = new HttpHeaders()
    let httpParams = new HttpParams().set("brand", params.brand).set("priceTo", params.priceTo).set("model", params.model).set("color", params.color)

    httpHeaders.append('Content-Type', 'application/json')
    return this._http.get<any[]>(`${environment.apiUrl}/cars/search`, { headers: httpHeaders, params: httpParams })
  }

  getCarsPost() {
    return this._http.post<any[]>(`${environment.apiUrl}/cars`, {  })
  }

  searchCarsPost(params) {
    return this._http.post<any[]>(`${environment.apiUrl}/cars/search`, { params })
  }
}
