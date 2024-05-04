import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CrearCitaComponent } from './Egresados/crear-cita/crear-cita.component';
import { ConsultarCitaComponent } from './Egresados/consultar-cita/consultar-cita.component';
import { AdministrarCitasComponent } from './Personal/administrar-citas/administrar-citas.component';
import { AdministrarUsuariosComponent } from './Personal/administrar-usuarios/administrar-usuarios.component';
import { CrearUsuariosComponent } from './Personal/crear-usuarios/crear-usuarios.component';
import { ModificarUsuariosComponent } from './Personal/modificar-usuarios/modificar-usuarios.component';
import { CrearAdminComponent } from './Personal/crear-admin/crear-admin.component';
import { ModificarAdminComponent } from './Personal/modificar-admin/modificar-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { ServiciosService } from './servicios/servicios.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarioComponent } from './calendario/calendario.component';
import { FechasComponent } from './Personal/fechas/fechas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearCitaComponent,
    ConsultarCitaComponent,
    AdministrarCitasComponent,
    AdministrarUsuariosComponent,
    CrearUsuariosComponent,
    ModificarUsuariosComponent,
    CrearAdminComponent,
    ModificarAdminComponent,
    CalendarioComponent,
    FechasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule
    ],
  providers: [
    ServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
