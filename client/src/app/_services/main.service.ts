import { Kupac } from './../_models/kupac';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const httpOptions = {
headers: new HttpHeaders({
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
}),
};
@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient,) { }
  getKupci() {
    return this.http.get<Kupac[]>(
      this.baseUrl + `Kupac`,
    );
  }
}
