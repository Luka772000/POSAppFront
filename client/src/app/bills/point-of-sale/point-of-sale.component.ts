import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IKupac } from 'src/app/_models/kupac';
import { IProizvod } from 'src/app/_models/proizvod';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css'],
})
export class PointOfSaleComponent implements OnInit {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Uredite profil', cols: 1, rows: 1 },
          { cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Uredite profil', cols: 1, rows: 1 },
        { cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },

      ];
    })
  );

  constructor(private mainService: MainService,private breakpointObserver: BreakpointObserver) {}
  kupci: IKupac[];
  kupac: any;
  proizvodi: IProizvod[];
  proizvod:any;
  selectedKupac: null;
  selectedProiz:null
  kolicina:number=1;
  ngOnInit(): void {
    this.loadKupci();
    this.loadProizvodi();
  }
  loadKupci() {
    this.mainService.getKupci().subscribe((Kupac) => {
      this.kupci = Kupac;
      console.log(this.kupci)
    });
  }
  loadProizvodi() {
    this.mainService.getProizvodi().subscribe((Proizvod) => {
      this.proizvodi = Proizvod;
    });
  }
  onKupacChange(kupac:IKupac){

  }
  onProdChange(prod:IProizvod){

  }
}
