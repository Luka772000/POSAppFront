import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchFilter1 } from './buyers/create-kupac/search-filter.component';
import { LoginComponent } from './login/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './_modules/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateKupacComponent } from './buyers/create-kupac/create-kupac.component';
import { ToastrModule } from 'ngx-toastr';
import { DeleteKupacDialogComponent } from './buyers/create-kupac/delete-kupac-dialog/delete-kupac-dialog.component';
import { EditKupacComponent } from './buyers/create-kupac/edit-kupac/edit-kupac.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptors';
import { ErrorInterceptor } from './_interceptors/error.interceptors';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PointOfSaleComponent } from './bills/point-of-sale/point-of-sale.component';
import { ProductsComponent } from './products/products/products.component';
import { DeleteProductDialogComponent } from './products/delete-product-dialog/delete-product-dialog/delete-product-dialog.component';
import { EditProductDialogComponent } from './products/edit-product-dialog/edit-product-dialog/edit-product-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { CustomDatePipe} from './bills/point-of-sale/custom-date-pipe/custom-date-pipe.component';
import { BillListComponent } from './bills/bill-list/bill-list.component';
import { DeleteBillDialogComponent } from './bills/bill-list/delete-bill-dialog/delete-bill-dialog.component';
import { PrintBillDialogComponent } from './bills/bill-list/print-bill-dialog/print-bill-dialog.component';
import { NgxPrintModule } from 'ngx-print';
import { AddStavkaComponent } from './bills/add-stavka/add-stavka.component';
import{NgSelectModule} from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CreateKupacComponent,
    SearchFilter1,
    DeleteKupacDialogComponent,
    EditKupacComponent,
    PointOfSaleComponent,
    ProductsComponent,
    DeleteProductDialogComponent,
    EditProductDialogComponent,
    CustomDatePipe,
    BillListComponent,
    DeleteBillDialogComponent,
    PrintBillDialogComponent,
    AddStavkaComponent,
    

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatGridListModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left"
    }),
    NgxSpinnerModule,
    NgxPrintModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
