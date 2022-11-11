import { IZaglavljeRacuna } from './../../_models/product';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastNoAnimation } from 'ngx-toastr';
import { map } from 'rxjs';
import { IKupac } from 'src/app/_models/kupac';
import { IProizvod, IStavkaRacuna } from 'src/app/_models/product';
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

  constructor(
    private mainService: MainService,
    private breakpointObserver: BreakpointObserver
  ) {}

  maxKolicina: number = 1;
  kupci: IKupac[];
  kupac: IKupac;
  proizvodi: IProizvod[];
  uploadRacunForm: FormGroup;
  addStavkaForm: FormGroup;
  model: any = {};
  model1: any = {};
  selectedKupac: IKupac;
  selectedProizvod: IProizvod = null;
  kolicina: number = 1;
  popust: number = 0;
  stavke: any[] = [];
  holder: any = {};
  total: number = 0;
  totalPopust: number = 0;
  totalBezPopusta: number = 0;
  zaglavljeRacuna: IZaglavljeRacuna = null;
  provjera: boolean = false;
  ngOnInit(): void {
    this.initializeForm();
    this.loadKupci();
    this.loadProizvodi();
    this.findTotal();
  }
  loadKupci() {
    this.mainService.getKupci().subscribe((Kupac) => {
      this.kupci = Kupac;
    });
  }
  loadProizvodi() {
    this.mainService.getProducts().subscribe((Proizvod) => {
      this.proizvodi = Proizvod;
    });
  }
  initializeForm() {
    this.uploadRacunForm = new FormGroup({
      datum: new FormControl(this.model.datum, Validators.required),
      napomena: new FormControl(this.model.napomena, [
        Validators.maxLength(50),
        Validators.required,
      ]),
      kupacId: new FormControl(this.model.kupacId, Validators.required),
      stavkeRacuna: new FormControl([]),
      ukupnaCijena: new FormControl(this.model.ukupnaCijena),
    });
    this.uploadRacunForm.controls['datum'].setValue(new Date());
    this.uploadRacunForm.controls['napomena'].setValue('Nema napomene');
    this.addStavkaForm = new FormGroup({
      naziv: new FormControl(this.model1.naziv),
      kolicina: new FormControl(this.model1.kolicina, Validators.required),
      cijena: new FormControl(this.model1.cijena),
      popust: new FormControl(this.model1.popust, Validators.required),
      iznosPopusta: new FormControl(this.model1.iznosPopusta),
      vrijednost: new FormControl(this.model1.vrijednost),
      proizvodId: new FormControl(this.model1.proizvodId),
    });
  }
  addProizvod() {
    console.log(this.addStavkaForm.controls['kolicina'].value);
    this.addStavkaForm.controls['cijena'].setValue(
      this.selectedProizvod.cijena
    );
    this.addStavkaForm.controls['naziv'].setValue(this.selectedProizvod.naziv);
    this.addStavkaForm.controls['proizvodId'].setValue(
      this.selectedProizvod.id
    );
    this.addStavkaForm.controls['popust'].setValue(
      this.addStavkaForm.controls['popust'].value
    );
    this.addStavkaForm.controls['iznosPopusta'].setValue(
      (this.addStavkaForm.controls['popust'].value / 100) *
        this.addStavkaForm.controls['cijena'].value *
        this.addStavkaForm.controls['kolicina'].value
    );
    this.addStavkaForm.controls['vrijednost'].setValue(
      this.addStavkaForm.controls['cijena'].value *
        this.addStavkaForm.controls['kolicina'].value -
        this.addStavkaForm.controls['iznosPopusta'].value
    );
    console.log(this.addStavkaForm.value);
    const productListForm = this.uploadRacunForm.get('stavkeRacuna');
    productListForm.setValue([
      ...productListForm.value,
      this.addStavkaForm.value,
    ]);
    this.selectedProizvod.stanje -=
      this.addStavkaForm.controls['kolicina'].value;
    this.stavke = this.uploadRacunForm.get('stavkeRacuna').value;
    this.addStavkaForm.reset();
    this.findTotal();
    this.check();
  }
  addKupac() {
    this.uploadRacunForm.controls['kupacId'].setValue(this.selectedKupac.id);
    this.holder = this.uploadRacunForm.value;
    this.check();
  }
  onProizvodChange(proizvod: IProizvod) {
    this.maxKolicina = this.selectedProizvod.stanje;
  }
  onKupacChange(kupac: IKupac) {
    console.log(this.selectedKupac);
  }
  findTotal() {
    this.total = 0;
    this.totalPopust = 0;
    for (let j = 0; j < this.stavke.length; j++) {
      this.total = this.total + this.stavke[j].vrijednost;
      this.totalPopust = this.totalPopust + this.stavke[j].iznosPopusta;
    }
    this.totalBezPopusta = this.total + this.totalPopust;
    this.uploadRacunForm.controls['ukupnaCijena'].setValue(this.total);
  }
  //PROVJERA JE LI IMA STAVKE RACUNA I KUPCA
  check() {
    this.model = this.uploadRacunForm.value;
    if (this.model.stavkeRacuna.length != 0 && this.model.kupacId != null) {
      this.provjera = true;
    }
  }
  postRacun() {
    this.model = this.uploadRacunForm.value;
    console.log(this.model);
    this.mainService.postRacun(this.model).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      }
    );
  }
}
