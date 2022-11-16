import { MainService } from './../../../_services/main.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-kupac-dialog',
  templateUrl: './delete-kupac-dialog.component.html',
  styleUrls: ['./delete-kupac-dialog.component.css']
})
export class DeleteKupacDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public kupac: any,private mainService:MainService) { }

  ngOnInit(): void {
  }
  deleteKupac(id: number) {
    this.mainService.deleteKupac(id).subscribe(
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
