import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { Kupac } from './_models/kupac';
import { SearchFilter1 } from './buyers/create-kupac/search-filter.component';
import { LoginComponent } from './login/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TextInputComponent,
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

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left"
    }),
    NgxSpinnerModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
