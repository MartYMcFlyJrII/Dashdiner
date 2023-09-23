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
import { AgregarProductoComponent } from './pages/administrador/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/administrador/editar-producto/editar-producto.component';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GridComponent } from './components/grid/grid.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { LogoComponent } from './components/logo/logo.component';
import { FormComponent } from './components/form/form.component';
import { AdminMenuComponent } from './pages/administrador/admin-menu/admin-menu.component';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OpcionFormComponent } from './components/opcion-form/opcion-form.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoriasComponent } from './pages/administrador/categorias/categorias.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
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
    AgregarProductoComponent,
    EditarProductoComponent,
    HomeComponent,
    GridComponent,
    DialogComponent,
    MensajeComponent,
    SidenavComponent,
    LogoComponent,
    FormComponent,
    AdminMenuComponent,
    OpcionFormComponent,
    CarouselComponent,
    CategoriasComponent,
    CategoriaComponent,
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
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSelectModule,
    NgbCarouselModule,
  ],

  providers: [GlobalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
