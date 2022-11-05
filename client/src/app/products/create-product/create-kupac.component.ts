import { IKupac, Kupac } from '../../_models/kupac';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-create-kupac',
  templateUrl: './create-kupac.component.html',
  styleUrls: ['./create-kupac.component.css']
})
export class CreateKupacComponent implements OnInit {
  model: any = {};
  constructor(private mainService: MainService) { }
  uploadForm: FormGroup;
  searchText = '';
  kupci : IKupac[];
  ngOnInit(): void {
    this.loadKupci();
    this.initializeForm();
  }
  initializeForm() {
    this.uploadForm = new FormGroup({
      naziv: new FormControl(this.model.naziv, [Validators.maxLength(50),Validators.required]),
      mjesto: new FormControl(this.model.mjesto, [Validators.maxLength(50),Validators.required]),
      adresa: new FormControl(this.model.adresa,[Validators.maxLength(50),Validators.required]),
    });
  }
  uploadProduct() {
    console.log(this.model);
  }
  loadKupci() {
    this.mainService.getKupci().subscribe((Kupac) => {
      this.kupci = Kupac;
      console.log(this.kupci);
    });
  }
}
