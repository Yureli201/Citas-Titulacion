import { NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
import { CalendarioComponent } from './calendario/calendario.component';
import { FechasComponent } from './Personal/fechas/fechas.component';

const routes: Routes = [
  {path:'app-component', component:AppComponent},
  {path:'crear-cita/:id', component:CrearCitaComponent},
  {path:'consultar-cita/:id', component:ConsultarCitaComponent},
  {path:'administrar-citas', component:AdministrarCitasComponent},
  {path:'administrar-usuarios', component:AdministrarUsuariosComponent},
  {path:'crear-usuarios', component:CrearUsuariosComponent},
  {path:'modificar-usuarios/:matricula', component:ModificarUsuariosComponent},
  {path:'crear-admin', component:CrearAdminComponent},
  {path:'modificar-admin/:nTrabajador', component:ModificarAdminComponent},
  {path:'calendario', component:CalendarioComponent},
  {path:'fechas', component:FechasComponent},
  {path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
