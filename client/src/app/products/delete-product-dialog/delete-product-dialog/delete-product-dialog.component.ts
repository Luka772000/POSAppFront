import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public product: any,private mainService:MainService) { }

  ngOnInit(): void {
  }
  deleteProduct(id: number) {
    this.mainService.deleteProduct(id).subscribe(
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
