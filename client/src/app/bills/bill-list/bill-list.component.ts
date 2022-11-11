import { ZaglavljeRacuna } from './../../_models/product';
import { MainService } from 'src/app/_services/main.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBillDialogComponent } from './delete-bill-dialog/delete-bill-dialog.component';
import { PrintBillDialogComponent } from './print-bill-dialog/print-bill-dialog.component';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css'],
})
export class BillListComponent implements OnInit {
  constructor(private mainService: MainService, private dialog: MatDialog) {}
  zaglavljeRacuna: ZaglavljeRacuna[];
  selectedRacun: any;

  ngOnInit(): void {
    this.loadRacuni();
  }
  loadRacuni() {
    this.mainService.getRacuni().subscribe((ZaglavljeRacuna) => {
      this.zaglavljeRacuna = ZaglavljeRacuna;
      console.log(this.zaglavljeRacuna);
    });
  }
  onRacunChange(racun) {
    this.selectedRacun = console.log(this.selectedRacun);
  }
  openDialog(id: number) {
    this.dialog.open(DeleteBillDialogComponent, {
      width: '400px',
      height: '220px',
      data: { id },
    });
  }
  openPrintDialog(racun: ZaglavljeRacuna) {
    this.dialog.open(PrintBillDialogComponent, {
      width: '1000px',
      height: '800px',
      data: { racun },
    });
  }
}
