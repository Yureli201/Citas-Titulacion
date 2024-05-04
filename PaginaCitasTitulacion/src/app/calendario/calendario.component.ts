import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @Output() fechaSeleccionadaEvent: EventEmitter<string> = new EventEmitter<string>();

  fechaConsulta: Date = new Date(); // La fecha de consulta por defecto es la fecha actual
  fechaSeleccionada: string | null = null; // La fecha seleccionada en el formato yyyy-mm-dd
  diasSemana: string[] = ['D','L', 'M', 'M', 'J', 'V', 'S'];
  diasMes: any[] = []; // Array para almacenar los días del mes actual
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  fechasDeshabilitadas: string[] = [];

  constructor(private servicio:ServiciosService ) { }

  ngOnInit(): void {
    this.generarDiasDeshabilitados()
    this.generarCalendario();
  }

  generarCalendario(): void {
    const primerDiaMes = new Date(this.fechaConsulta.getFullYear(), this.fechaConsulta.getMonth(), 1);
    const ultimoDiaMes = new Date(this.fechaConsulta.getFullYear(), this.fechaConsulta.getMonth() + 1, 0);

    this.diasMes = [];

    for (let i = 0; i < primerDiaMes.getDay(); i++) {
      this.diasMes.push({ dia: '' });
    }

    for (let i = 1; i <= ultimoDiaMes.getDate(); i++) {
      const fecha = new Date(this.fechaConsulta.getFullYear(), this.fechaConsulta.getMonth(), i);
      let estado = '';
      if (fecha.getDay() === 0 || fecha.getDay() === 6 || fecha < new Date()) {
        estado = 'deshabilitado';
      } else if (this.fechasDeshabilitadas.includes(this.formatoFecha(fecha))) {
        estado = 'deshabilitado';
      } else {
        estado = 'libre';
      }
      if (this.formatoFecha(fecha) === this.fechaSeleccionada) {
        estado = 'seleccionado';
      }
      this.diasMes.push({ dia: i, estado: estado });
    }
  }


  cambiarMes(direccion: number): void {
    const siguienteMes = new Date(this.fechaConsulta);
    siguienteMes.setMonth(siguienteMes.getMonth() + direccion);
  
    const mesSiguiente = new Date();
    mesSiguiente.setMonth(mesSiguiente.getMonth() + 1);
  
    const mesActual = new Date();
    mesActual.setDate(1); // Aseguramos que sea el primer día del mes actual
  
    if (direccion > 0 && siguienteMes <= mesSiguiente) {
      this.fechaConsulta = siguienteMes;
    } else if (direccion < 0 && siguienteMes >= mesActual) {
      this.fechaConsulta = siguienteMes;
    }
  
    this.generarCalendario();
  }
  
  
  

  seleccionarFecha(diaSeleccionado: any): void {
    if (diaSeleccionado.estado === 'libre') {
      const dia = diaSeleccionado.dia < 10 ? '0' + diaSeleccionado.dia : diaSeleccionado.dia;
      const mes = this.fechaConsulta.getMonth() + 1 < 10 ? '0' + (this.fechaConsulta.getMonth() + 1) : this.fechaConsulta.getMonth() + 1;
      const anio = this.fechaConsulta.getFullYear();
      this.fechaSeleccionada = `${anio}-${mes}-${dia}`;
      this.generarCalendario(); // Actualizar el calendario después de seleccionar una fecha
      this.fechaSeleccionadaEvent.emit(this.fechaSeleccionada);
    }
  }

  formatoFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1 < 10 ? '0' + (fecha.getMonth() + 1) : fecha.getMonth() + 1;
    const day = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate();
    return `${year}-${month}-${day}`;
  }

  generarDiasDeshabilitados() {
    this.servicio.mostrarFechas().subscribe(
      (data: any) => {
        this.fechasDeshabilitadas= data
        this.generarCalendario();

      },
      error => {
        console.error("Ocurrió un error al obtener las fechas:", error);
      }
    );
  }
}
