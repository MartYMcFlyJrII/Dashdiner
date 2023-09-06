import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalService } from './services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component';
import { RegistroRestauranteComponent } from './pages/registro-restaurante/registro-restaurante.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { ProductosComponent } from './pages/administrador/productos/productos.component';
import { AgregarProductoComponent } from './pages/administrador/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/administrador/editar-producto/editar-producto.component';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GridRestauranteComponent } from './components/grid-restaurante/grid-restaurante.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchbarComponent,
    BuscarComponent,
    LoginComponent,
    RegistroClienteComponent,
    RegistroRestauranteComponent,
    CarritoComponent,
    MenuComponent,
    ProductoComponent,
    AdministradorComponent,
    ProductosComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    HomeComponent,
    GridRestauranteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
