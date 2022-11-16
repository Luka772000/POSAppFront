import { IKupac} from '../../_models/kupac';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/_services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteKupacDialogComponent } from './delete-kupac-dialog/delete-kupac-dialog.component';
import { EditKupacComponent } from './edit-kupac/edit-kupac.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-create-kupac',
  templateUrl: './create-kupac.component.html',
  styleUrls: ['./create-kupac.component.css']
})
export class CreateKupacComponent implements OnInit {
  model: any = {};
  bsModalRef: BsModalRef;
  constructor(private mainService: MainService,private dialog: MatDialog,private modalService: BsModalService,) { }
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
  openDialog(id: number) {
    this.dialog.open(DeleteKupacDialogComponent, {
      width: '400px',
      height: '220px',
      data: { id },
    });
  }
  loadKupci() {
    this.mainService.getKupci().subscribe((Kupac) => {
      this.kupci = Kupac;
    });
  }
  postKupac() {
    this.model = this.uploadForm.value;
    console.log(this.model);
    this.mainService.postKupac(this.model).subscribe(
      (res) => {
        this.loadKupci();
        this.uploadForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openUpdateDialog(kupac: IKupac) {
    this.dialog.open(EditKupacComponent, {
      width: '600px',
      height: '410px',
      data: { kupac },
  })}
}
