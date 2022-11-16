import { MainService } from 'src/app/_services/main.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-kupac',
  templateUrl: './edit-kupac.component.html',
  styleUrls: ['./edit-kupac.component.css']
})
export class EditKupacComponent implements OnInit {
  upKup: any={};
  constructor(private mainService:MainService,private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public kupac) { }
  updateForm: FormGroup;
  ngOnInit(): void {this.initializeForm();}
  initializeForm() {
    this.updateForm = new FormGroup({
      id : new FormControl(this.upKup.id),
      naziv: new FormControl(this.upKup.naziv, [Validators.maxLength(50),Validators.required]),
      adresa: new FormControl(this.upKup.adresa, [Validators.maxLength(50),Validators.required]),
      mjesto: new FormControl(this.upKup.mjesto, [Validators.maxLength(50),Validators.required]),
    });
    this.updateForm.controls['id'].setValue(this.kupac.kupac.id);
    this.updateForm.controls['naziv'].setValue(this.kupac.kupac.naziv);
    this.updateForm.controls['adresa'].setValue(this.kupac.kupac.adresa);
    this.updateForm.controls['mjesto'].setValue(this.kupac.kupac.mjesto);
    
  }
  updateKupac() {
    this.mainService.upKupFormData = this.updateForm.value;
    this.mainService.updateKupac().subscribe(
      (res) => {
        this.toastr.success('Kupac je uspješno izmijenjen');
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
