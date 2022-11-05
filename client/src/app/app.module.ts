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
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './_modules/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateKupacComponent } from './buyers/create-kupac/create-kupac.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DeleteKupacDialogComponent } from './buyers/create-kupac/delete-kupac-dialog/delete-kupac-dialog.component';
import { EditKupacComponent } from './buyers/create-kupac/edit-kupac/edit-kupac.component';
import { ToastrModule } from 'ngx-toastr';


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

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
