import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IProizvod } from 'src/app/_models/product';
import { MainService } from 'src/app/_services/main.service';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog/delete-product-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  model: any = {};
  bsModalRef: BsModalRef;
  constructor(private mainService: MainService,private dialog: MatDialog,private modalService: BsModalService,) { }
  uploadForm: FormGroup;
  searchText = '';
  products : IProizvod[];
  ngOnInit(): void {
    this.loadProducts();
    this.initializeForm();
  }
  initializeForm() {
    this.uploadForm = new FormGroup({
      naziv: new FormControl(this.model.naziv, [Validators.maxLength(50),Validators.required]),
      jedinicaMjere: new FormControl(this.model.jedinicaMjere, [Validators.maxLength(50),Validators.required]),
      cijena: new FormControl(this.model.cijena,[Validators.maxLength(50),Validators.required]),
      stanje: new FormControl(this.model.stanje,[Validators.maxLength(50),Validators.required]),
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  loadProducts() {
    this.mainService.getProducts().subscribe((Product) => {
      this.products = Product;
    });
  }
  postProduct() {
    this.model = this.uploadForm.value;
    console.log(this.model);
    this.mainService.postProduct(this.model).subscribe(
      (res) => {
        this.loadProducts();
        this.uploadForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openDialog(id: number) {
    this.dialog.open(DeleteProductDialogComponent, {
      width: '400px',
      height: '220px',
      data: { id },
    });
  }
  openUpdateDialog(product: IProizvod) {
    this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      height: '610px',
      data: { product },
  })}
  
}
