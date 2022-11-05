import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CreateKupacComponent } from './products/create-product/create-kupac.component';

const routes: Routes = [{
  path: '',
  component: CreateKupacComponent,
},
{
  path: '',
  runGuardsAndResolvers: 'always',
  children: [
    {
      path: 'create-product',
      component: CreateKupacComponent,
      // canActivate: [AuthGuard],
    },
    
    // { path: 'contact', component: ContactComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    // {
    //   path: 'dashboard',
    //   component: DASHBOARDComponent,
    //   canActivate: [AuthGuard],
    // },
    // {
    //   path: 'admin-control',
    //   component: AdminControlComponent,
    //   canActivate: [AdminGuard],
    // },
  ],
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
