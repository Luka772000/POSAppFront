import { UpdateProductClass } from './../_models/product';
import { Kupac, UpdateKupacClass } from './../_models/kupac';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';
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
  upProdFormData: UpdateProductClass = new UpdateProductClass();
  constructor(private http: HttpClient,) { }
  getKupci() {
    return this.http.get<Kupac[]>(
      this.baseUrl + `Kupac`,
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
  getProducts() {
    return this.http.get<Product[]>(
      this.baseUrl + `Proizvod`,
    );
  }
  postProduct(proizvodForm: any) {
    return this.http.post(
      this.baseUrl + `Proizvod`,
      proizvodForm
    );
  }
  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + `Proizvod/Delete/` + id);
  }
  updateProduct() {
    console.log(this.upProdFormData);
    return this.http.put(
      this.baseUrl + `Proizvod` ,
      this.upProdFormData
    );
  }
}
