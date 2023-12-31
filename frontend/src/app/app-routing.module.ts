import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { LoginComponent } from './pages/login/login.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component';
import { RegistroRestauranteComponent } from './pages/registro-restaurante/registro-restaurante.component';
import { HomeComponent } from './pages/home/home.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminMenuComponent } from './pages/administrador/admin-menu/admin-menu.component';
import { CategoriasComponent } from './pages/administrador/categorias/categorias.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetCodeComponent } from './pages/reset-code/reset-code.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
const routes: Routes = [
  {
    path: 'administrador/:id',
    component: AdministradorComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'menu', component: AdminMenuComponent },
      { path: 'categorias', component: CategoriasComponent },
    ],
  },
  { path: 'buscar/:texto', component: BuscarComponent },
  { path: 'registro-cliente', component: RegistroClienteComponent },
  { path: 'registro-restaurante', component: RegistroRestauranteComponent },
  {
    path: 'ver-menu/:id',
    component: MenuComponent,
  },
  { path: 'carrito', component: CarritoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-code', component: ResetCodeComponent},
  { path: 'new-password', component: NewPasswordComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
