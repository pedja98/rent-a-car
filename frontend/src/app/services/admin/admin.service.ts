import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.post<any[]>(`${environment.apiUrl}/admin/users`, {});
  }

  getAdminLS(): Observable<any> {
    return of(JSON.parse(localStorage.getItem("user")));
  }

  removeAdminLS(): Observable<any> {
    return of(localStorage.removeItem("user"));
  }

  removeTokenLS(): Observable<any> {
    return of(localStorage.removeItem("token"));
  }

  deleteUser(username: string) {
    return this._http.post<any>(`${environment.apiUrl}/admin/delete`, {
      username,
    });
  }

  modifyUser(modify: any) {
    return this._http.post<any>(`${environment.apiUrl}/admin/modify`, modify);
  }
}
