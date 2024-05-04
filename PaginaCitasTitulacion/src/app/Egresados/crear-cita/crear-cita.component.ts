import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { Egresado, Citas } from 'src/app/servicios/Modelos/Modelos';
@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent {

  horarios:string[]=[
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
  horariosDisponibles!: any;
  horariosOcupados!: any;
  



  mostrarBanner=false
  mostrarBannerDos=false

  Cita:any={
  }
  
  Egresado:any={
  }
  matricula: any="";

  
  constructor(private route:Router, private servicio:ServiciosService, private activeRoute: ActivatedRoute){
    this.horariosDisponibles = [];
    setInterval( ()=> this.mostrarBanner = false, 3000)
  }

  //Extraer la variable :id del link como matricula
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.matricula = params.get('id');
      if (this.matricula !== null) {
        this.buscarEgresado()
      } else {
        console.error('El parámetro "id" no está presente en la URL.');
      }
    });
  }

  buscarEgresado(){
    if (this.matricula) {
      this.servicio.mostrarUsuario(this.matricula).subscribe(
        data => {
          this.Egresado = data;
          console.log(this.Egresado);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('El parámetro "id" está vacío.');
    }
  }

  fechaSeleccionada: string | null = null;

  manejarFechaSeleccionada(fechaSeleccionada: string) {
    this.fechaSeleccionada = fechaSeleccionada;
    console.log("Fecha seleccionada:", fechaSeleccionada);

    this.Cita.fecha= fechaSeleccionada
    // Aquí puedes realizar otras acciones con la fecha seleccionada
    this.buscarHorariosCita(fechaSeleccionada)
  }
  
  confirmarCita(){
    if (this.Cita.fecha=="" || this.Cita.hora=="") {
      this.mostrarBanner = true;
    } 
    else {
      this.Cita.matriculaEgresado = this.Egresado.matricula;
  
      console.log(this.Cita);
      this.servicio.crearCita(this.matricula, this.Cita).subscribe(
        data => {
          console.log(data);
          setTimeout(() => { this.mostrarBannerDos = true; }, 2000);
          setTimeout(() => { this.route.navigate([`/consultar-cita/${this.Cita.matriculaEgresado}`]); }, 2000);
        },
        error => {
          console.log("Hay un error:");
          console.error(error);
        }
      );
    }
  }
  
  
  buscarHorariosCita(fechaSeleccionada: string) {
    this.servicio.buscarHorarios(fechaSeleccionada).subscribe(
      data => {
          this.horariosOcupados = data;
          console.log('Horarios encontrados:', data);
          this.actualizarHorarios()
      },
      error => {
        console.error('Ocurrió un error al buscar los horarios:', error);
      }
    );
  }

  actualizarHorarios() {
    this.horariosDisponibles.length = 0
    this.horarios.forEach(horario => {
        if (!this.horariosOcupados.includes(horario)) {
            this.horariosDisponibles.push(horario);
        }
    });
    console.log(this.horariosDisponibles)
}
}
