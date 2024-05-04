import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { Router } from '@angular/router';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-administrar-citas',
  templateUrl: './administrar-citas.component.html',
  styleUrls: ['./administrar-citas.component.css']
})
export class AdministrarCitasComponent {
  constructor(private route: Router, private servicio: ServiciosService) {
    this.horariosDisponibles = [];
  }


  citas: any = []; // Ahora citas es un array de objetos de tipo Cita

  CitaAc: any={
    id:0,
    hora:"",
    fecha:"",
    estado:true
  }

  idEliminar:number=0;

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
    "13:45 hrs."
    ];
    horariosDisponibles!: any;
    horariosOcupados!: any;

  borrar=faTrash;
  actualizar= faPencil

  ngOnInit() {
    this.obtenerCitas();
  }

  obtenerCitas() {
    this.servicio.mostrarTodasCitas().subscribe(
      data => {
        this.citas = data;
        console.log(data);
      },
      error => {
        if (error.status === 404) {
          this.citas = []; // Establecer citas como un array vacío
          console.log("No se encontraron citas.");
        } else {
          console.log("Error al obtener citas:");
          console.error(error);
        }
      }
    );
  }

  modificar(citaAc:any){
    return this.servicio.actualizarCita(citaAc.id, citaAc).subscribe(
      data =>{
        console.log("Cita modificada")
        this.obtenerCitas();
      },
      error =>{
      console.error(error);
      }
      )
  }

  eliminar(id:number){
    return this.servicio.eliminarCita(id).subscribe(
      data => {
        console.log("Cita elimimnada")
        this.obtenerCitas();
      },
      error =>{
        console.error(error)
      }
      )
  }
  
  mostrar(citaMostrar:any){
    this.CitaAc.hora=citaMostrar.hora; 
    this.CitaAc.fecha=citaMostrar.fecha;
    this.CitaAc.id=citaMostrar.id;
    this.CitaAc.estado=citaMostrar.estado;
  }

  fechaSeleccionada: string | null = null;

  manejarFechaSeleccionada(fechaSeleccionada: string) {
    this.fechaSeleccionada = fechaSeleccionada;
    console.log("Fecha seleccionada:", fechaSeleccionada);
    this.CitaAc.fecha= fechaSeleccionada

    this.buscarHorariosCita(fechaSeleccionada)

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

