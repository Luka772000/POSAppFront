import { ProductsComponent } from './products/products/products.component';
import { PointOfSaleComponent } from './bills/point-of-sale/point-of-sale.component';
import { LoginGuard } from './_guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CreateKupacComponent } from './buyers/create-kupac/create-kupac.component';
import { RegisterComponent } from './register/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    children: [  
      { path: 'register', component: RegisterComponent },
      {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
      {path: 'create-kupac', component: CreateKupacComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'pos', component: PointOfSaleComponent}
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
