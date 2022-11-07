import { Kupac, UpdateKupacClass } from './../_models/kupac';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proizvod } from '../_models/proizvod';
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
  upKupFormData: UpdateKupacClass = new UpdateKupacClass();
  constructor(private http: HttpClient,) { }
  getKupci() {
    return this.http.get<Kupac[]>(
      this.baseUrl + `Kupac`,
    );
  }
  getProizvodi() {
    return this.http.get<Proizvod[]>(
      this.baseUrl + `Proizvod`,
    );
  }
  postKupac(kupacForm: any) {
    return this.http.post(
      this.baseUrl + `Kupac`,
      kupacForm
    );
  }
  deleteKupac(id: number) {
    return this.http.delete(this.baseUrl + `Kupac/Delete/` + id);
  }
  updateKupac() {
    console.log(this.upKupFormData);
    return this.http.put(
      this.baseUrl + `Kupac/Update/` ,
      this.upKupFormData
    );
  }
}
