import { Component } from '@angular/core';
import { Egresado } from 'src/app/servicios/Modelos/Modelos';
import { Router }  from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent {
  egresado:Egresado={
    matricula:null,
    nombre:"",
    nivelTitulacion:"",
    generacion:"",
    carreraTitulacion:"",
    correo:"",
    telefono:"",
    curp:"",
  }

  nivel:string="";

  carrerasTSU:string[]=
  [
  "Agricultura Sustentable y Protegida",
  "Gastronomía",
  "Procesos Alimentarios",
  "Química Área Biotecnología",
  "Administración Área Capital Humano",
  "Operaciones Comerciales Internacionales Área Negocios Internacionales",
  "Mecatrónica Área Automatización.",
  "Sistemas Automotrices",
  "Mantenimiento Área Industrial",
  "Mantenimiento Área Petróleo",
  "Terapia Física Área Rehabilitación",
  "Tecnologías de la Información Área Desarrollo de Software Multiplataforma",
  "Tecnologías de la Información Área Entornos Virtuales y Negocios Digitales"
  ];
  carrerasLIC:string[]=
  [
  "Agricultura Sustentable y Protegida",
  "Gastronomía",
  "Procesos Alimentarios",
  "Biotecnología",
  "Gestión del Capital Humano",
  "Mecatrónica",
  "Mantenimiento Industrial",
  "Terapia Física",
  "Desarrollo y Gestión de Software",
  "Entornos Virtuales y Negocios Digitales"
  ];
  mostrarCarreras(){
    console.log(this.nivel);
    this.egresado.nivelTitulacion= this.nivel
  }

  constructor(private route:Router, private servicio:ServiciosService  ){}

  guradarUsuario(){
    this.servicio.crearUsuario(this.egresado).subscribe(
      data=>{
        console.log("Egresado creado con exito")
        console.log(this.egresado);
        setTimeout(() => {this.route.navigate([`/administrar-usuarios`]);}, 2000);

      },
      error=>{
      console.log(error)
      }
      )
  }


}
