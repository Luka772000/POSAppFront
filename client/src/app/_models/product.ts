export class Product {
    id: number = 0;
    sifra: number = 0;
    naziv: string = "";
    jedinicaMjere:string = "";
    cijena: number = 0;
    stanje: number = 0;
}
export interface IProduct {
    id: number;
    sifra: number;
    naziv: string;
    jedinicaMjere: string;
    cijena: number;
    stanje: number;
}
export class UpdateProductClass{
    id: number = 0;
    naziv: string = "";
    jedinicaMjere: string = "";
    cijena: number = 0;
    stanje: number = 0;
}