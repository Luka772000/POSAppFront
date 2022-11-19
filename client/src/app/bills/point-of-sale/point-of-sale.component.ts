import { IZaglavljeRacuna } from './../../_models/product';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { IKupac } from 'src/app/_models/kupac';
import { IProizvod } from 'src/app/_models/product';
import { MainService } from 'src/app/_services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from 'src/app/products/edit-product-dialog/edit-product-dialog/edit-product-dialog.component';
import { AddStavkaComponent } from '../add-stavka/add-stavka.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css'],
})
export class PointOfSaleComponent implements OnInit{
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
  @HostListener('window:keydown.+') otvori() {
    this.dialog.closeAll();
    let dialogRef = this.dialog.open(AddStavkaComponent, {
      width: '600px',
      height: '350px',
      data: { proizvodi: this.proizvodi },
    });
    dialogRef.afterClosed().subscribe((res) => {
      const productListForm = this.uploadRacunForm.get('stavkeRacuna');
      productListForm.setValue([...productListForm.value, res]);
      for (let i = 0; i < this.proizvodi.length; i++) {
        if (this.proizvodi[i].id == res.proizvodId) {
          this.proizvodi[i].stanje = this.proizvodi[i].stanje - res.kolicina;
        }
      }
      this.stavke = this.uploadRacunForm.get('stavkeRacuna').value;
      console.log(this.stavke);
      this.toastr.success('Proizvod je dodan na račun');
      this.findTotal();
      this.check();
    });
  }
  constructor(
    private mainService: MainService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  maxKolicina: number = 1;
  kupci: IKupac[];
  kupac: IKupac;
  proizvodi: IProizvod[];
  uploadRacunForm: FormGroup;
  model: any = {};
  selectedKupac: IKupac;
  selectedProizvod: IProizvod = null;
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
  }
  addProizvod() {
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
    for (let i = 0; i < this.model.stavkeRacuna.length; i++) {
      delete this.model.stavkeRacuna[i].jedinicaMjere;
    }
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
