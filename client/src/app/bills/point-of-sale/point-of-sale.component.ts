import { Component, OnInit } from '@angular/core';
import { IKupac } from 'src/app/_models/kupac';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit {

  constructor(private mainService:MainService) { }
  kupci: IKupac[];
  
  ngOnInit(): void {
  }
  loadKupci() {
    this.mainService.getKupci().subscribe((Kupac) => {
      this.kupci = Kupac;
    });
  }
  
}
