import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  
 myAppUrl = 'https://localhost:44325/api/archivos';

  constructor(private http: HttpClient) { }

  getListCaja(): Observable<any>{
    return this.http.get(this.myAppUrl);
  }

  deleteCaja(id:number): Observable<any>{
    return this.http.delete(this.myAppUrl + id)
  }

  saveCaja(caja:any): Observable<any>{
    return this.http.post(this.myAppUrl ,caja);
  }

  updateCaja(id: number, caja:any): Observable<any>{
    return this.http.put(this.myAppUrl + id, caja);
  }
}
