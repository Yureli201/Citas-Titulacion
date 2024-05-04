import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Egresado, Citas } from 'src/app/servicios/Modelos/Modelos';
import { ServiciosService } from 'src/app/servicios/servicios.service';


@Component({
  selector: 'app-consultar-cita',
  templateUrl: './consultar-cita.component.html',
  styleUrls: ['./consultar-cita.component.css']
})
export class ConsultarCitaComponent {

  horarios:String[]=[
    "9:00 hrs.",
    "9:15 hrs.",
    "9:30 hrs.",
    "9:45 hrs.",
    "10:00 hrs.",
    "10:15 hrs.",
    "10:30 hrs.",
    "10:45 hrs.",
    "11:00 hrs.",
    "11:15 hrs.",
    "11:30 hrs.",
    "11:45 hrs.",
    "12:00 hrs.",
    "12:15 hrs.",
    "12:30 hrs.",
    "12:45 hrs.",  
    "13:00 hrs.",
    "13:15 hrs.",
    "13:30 hrs.",
    "13:45 hrs.",
    "14:00 hrs.",
    "14:15 hrs.",
    "14:30 hrs.",
    "14:45 hrs.",
    ];
  
  mostrarBanner=false

  mostrarBannerDos=false

  fecha=""

  hora=""

  Cita:any={
    id:0,
    fecha:'',
    hora:'',
    matricula:0,
    nombre:''
    }

  Egresado:any={
    matricula:"",
    nombre:"",
    nivelTitulacion:"",
    generacion:"",
    carreraTitulacion:"",
    correo:"",
    telefono:"",
    curp:"",
    }
  matricula: any;

  constructor(private route:Router, private servicio:ServiciosService, private activeRoute: ActivatedRoute){
  }

    //Extraer la variable :id del link como matricula
    ngOnInit() {
      this.activeRoute.paramMap.subscribe(params => {
        this.matricula = params.get('id');
        if (this.matricula !== null) {
          this.buscarEgresado(this.matricula);
          this.buscarCita(this.matricula);

        } else {
          console.error('El parámetro "id" no está presente en la URL.');
        }
      });
    }

    //Buscar al egresado para llenar los valores predeterminados del formulario
    buscarEgresado(matricula: number) {
      this.servicio.mostrarUsuario(matricula).subscribe(
        data => {
          this.Egresado = data; // Asigna los datos a la propiedad Egresado, no a la función Egresado
        },
        error => {
          if (error.status === 404) {
            console.log("No se encontró la matrícula.");
          } else {
            console.log("Error al obtener egresado:");
            console.error(error);
          }
        }
      )
    }
    
    buscarCita(matricula: number) {
      this.servicio.mostrarCita(matricula).subscribe(
        (data) => {
          this.Cita = data;
          console.log(this.Cita)
        },
        (error) => {
          if (error.status === 404) {
            console.log("No se encontraron citas.");
          } else {
            console.log("Error al obtener citas:");
            console.error(error);
          }
        }
      )
    }
    
  
    actualizarCita(){
      console.log(this.Cita)
      this.servicio.actualizarCita(this.Cita.id, this.Cita).subscribe(
        data =>{
        console.log("Cita actualizada correctamente")
        setTimeout(() => {this.mostrarBannerDos=true}, 3000);
        this.buscarCita(this.matricula);
      },
        error =>{
        console.log(error)
        }
        )
    }

  eliminarCita(){
    this.servicio.eliminarCita(this.Cita.id).subscribe(
      data =>{
      console.log(data)
      },
      error =>{
      console.error
      }
      )

    setTimeout(() => {this.route.navigate([`/crear-cita/${this.matricula}`]);}, 2000);

  }

}
