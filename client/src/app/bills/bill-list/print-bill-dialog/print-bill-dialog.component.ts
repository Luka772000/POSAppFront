import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateFormat } from '../../point-of-sale/custom-date-pipe/custom-date-pipe.component';
@Component({
  selector: 'app-print-bill-dialog',
  templateUrl: './print-bill-dialog.component.html',
  styleUrls: ['./print-bill-dialog.component.css'],
})
export class PrintBillDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public racun: any) {}

  ngOnInit(): void {
    console.log(this.racun);
  }
}
