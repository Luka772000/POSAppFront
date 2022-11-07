export class Proizvod {
    id: number = 0;
    sifra: number = 0;
    naziv: string = "";
    jedinicaMjere:string = "";
    stanje:number = 0;
}
export interface IProizvod {
    id: number;
    sifra: number;
    naziv: string;
    jedinicaMjere:string;
    stanje:number;
}
