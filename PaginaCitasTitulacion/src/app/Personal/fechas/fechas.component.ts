import { Component } from '@angular/core';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent {
  anioActual!: number;
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  fechaSeleccionada!: string;
  dias: { dia: number, diaSemana: number }[][] = [];
  fechasSeleccionadas: string[] = [];
  fechasIniciales: string [] = [];
  fechasEliminar: string [] = [];



  constructor( private servicio:ServiciosService ) { }


// En el método ngOnInit, parsea las fechas seleccionadas al formato yyyy-mm-dd
ngOnInit(): void {
  const fechaHoy = new Date();
  this.anioActual = fechaHoy.getFullYear();
  this.generarCalendario(this.anioActual);

  // Parsear fechas seleccionadas al formato yyyy-mm-dd
  this.fechasSeleccionadas = this.fechasSeleccionadas.map(fecha => {
    const parts = fecha.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  });
  this.obtenerFechas();
}

// Método para verificar si una fecha está seleccionada
esFechaSeleccionada(anio: number, mes: number, dia: number): boolean {
  const fechaSeleccionada = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
  return this.fechasSeleccionadas.includes(fechaSeleccionada);
}


  seleccionarFecha(dia: number, mes: string) {
    const mesNumero = this.meses.indexOf(mes) + 1;
    const mesFormateado = mesNumero < 10 ? `0${mesNumero}` : mesNumero;
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const fechaSeleccionada = `${this.anioActual}-${mesFormateado}-${diaFormateado}`;
    
    if (!this.fechasSeleccionadas.includes(fechaSeleccionada)) {
      this.fechasSeleccionadas.push(fechaSeleccionada);
    } else {
      this.fechasSeleccionadas = this.fechasSeleccionadas.filter(fecha => fecha !== fechaSeleccionada);
    }
    console.log(this.fechasSeleccionadas)
  }

  cambiarAnio(offset: number) {
    this.anioActual += offset;
    this.generarCalendario(this.anioActual);
  }

  generarCalendario(anio: number) {
    this.dias = [];
    for (let mes = 0; mes < 12; mes++) {
      const primerDiaMes = new Date(anio, mes, 1).getDay(); // Día de la semana del primer día del mes
      const ultimoDiaMes = new Date(anio, mes + 1, 0).getDate(); // Último día del mes
      const semanas: { dia: number, diaSemana: number }[] = [];
      
      let contadorDiaSemana = 0;
      let diaSemana = primerDiaMes;
      for (let dia = 1; dia <= ultimoDiaMes; dia++) {
        semanas.push({ dia, diaSemana });
        diaSemana = (diaSemana + 1) % 7; // Siguiente día de la semana
        contadorDiaSemana++;
      }

      // Añadir días vacíos al principio si el primer día del mes no es domingo
      if (primerDiaMes !== 0) {
        for (let i = 0; i < primerDiaMes; i++) {
          semanas.unshift({ dia: 0, diaSemana: i });
        }
      }

      // Añadir días vacíos al final para completar la última semana si es necesario
      const ultimaSemana = semanas[semanas.length - 1];
      const diasFaltantes = 6 - ultimaSemana.diaSemana; // 6 es el índice del sábado
      if (diasFaltantes > 0) {
        for (let i = 1; i <= diasFaltantes; i++) {
          semanas.push({ dia: 0, diaSemana: (ultimaSemana.diaSemana + i) % 7 });
        }
      }

      this.dias.push(semanas);
    }
  }

  obtenerFechas(){
    this.servicio.mostrarFechas().subscribe(
      (data: any) => {
          this.fechasSeleccionadas = data;
          this.fechasIniciales = data;

      },
      error => {
        console.error("Ocurrió un error al obtener las fechas:", error);
      }
    );
  }

  agregarFechas(fechas: string[]) {
    this.servicio.agregarFechas(fechas).subscribe(
      data => {
        console.log(data);
        this.compararFechas()
      },
      error => {
        console.log(error);
      }
    );
  }
  
  compararFechas(){
    this.fechasEliminar = this.fechasIniciales.filter(fecha => !this.fechasSeleccionadas.includes(fecha));

    this.eliminarFechas(this.fechasEliminar);
    console.log(this.fechasEliminar)
  }

  eliminarFechas(fechas:string[]){
    console.log(fechas)
    this.servicio.eliminarFechas(fechas).subscribe(
      data => {
        console.log(data);
        this.obtenerFechas()
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarTodos(){
    this.servicio.eliminarTodasFechas().subscribe(
      data => {
        console.log(data);
        this.obtenerFechas()
      },
      error => {
        console.log(error);
      }
    );
  }
}

