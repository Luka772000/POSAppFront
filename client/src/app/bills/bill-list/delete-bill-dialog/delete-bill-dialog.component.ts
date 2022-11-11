import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-delete-bill-dialog',
  templateUrl: './delete-bill-dialog.component.html',
  styleUrls: ['./delete-bill-dialog.component.css'],
})
export class DeleteBillDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public racun: any,
    private mainService: MainService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  deleteRacun(id: number) {
    this.mainService.deleteRacun(id).subscribe(
      (result) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
        if (err.status === 200) {
          window.location.reload();
        }
      }
    );
  }
}
