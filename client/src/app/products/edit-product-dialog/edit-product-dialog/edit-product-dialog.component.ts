import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {
  upProd: any = {};
  constructor(private mainService:MainService,private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public product) { }
  updateForm: FormGroup;
  ngOnInit(): void {this.initializeForm();}
  initializeForm() {
    this.updateForm = new FormGroup({
      id : new FormControl(this.upProd.id),
      naziv: new FormControl(this.upProd.naziv, [Validators.maxLength(50),Validators.required]),
      jedinicaMjere: new FormControl(this.upProd.jedinicaMjere, [Validators.maxLength(50),Validators.required]),
      cijena: new FormControl(this.upProd.cijena, [Validators.maxLength(50),Validators.required]),
      stanje: new FormControl(this.upProd.stanje, [Validators.maxLength(50),Validators.required]),
    });
    this.updateForm.controls['id'].setValue(this.product.product.id);
    this.updateForm.controls['naziv'].setValue(this.product.product.naziv);
    this.updateForm.controls['jedinicaMjere'].setValue(this.product.product.jedinicaMjere);
    this.updateForm.controls['cijena'].setValue(this.product.product.cijena);
    this.updateForm.controls['stanje'].setValue(this.product.product.stanje);
    
  }
  updateProduct() {
    this.mainService.upProdFormData = this.updateForm.value;
    this.mainService.updateProduct().subscribe(
      (res) => {
        this.toastr.success('Proizvod je uspješno izmijenjen');
        window.setTimeout(function () {
          location.reload();
        }, 2000);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
