import { Component, OnInit, ViewChild } from '@angular/core';
import { Egresado, Personal } from 'src/app/servicios/Modelos/Modelos';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPencil, faUserPlus, faChevronUp, faChevronDown, faRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent {
  egresados:any = [];
  personal:any=[];
  botonUno = faChevronUp;
  visibleEgresados = true;
  botonDos = faChevronUp;
  visibleAdmin = true;

  agregar = faUserPlus;
  editar = faPencil;
  eliminar = faTrash;
  actualizar = faRotate;

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
  nivel:string="TSU";
  egresadoM:any={};
  personalM:any={};



  constructor(private servicios: ServiciosService) {
  }

  ngOnInit() {
    this.buscarEgresados();
    this.buscarPersonal()
  }

  buscarEgresados() {
    this.servicios.mostrarTodosUsuarios().subscribe(
      data => {
        this.egresados = data;
        console.log(data);
        console.log("Se encontraron egresados.");
      },
      error => {
        console.error("Error al obtener egresados:", error);
      }
    );
  }

  buscarPersonal(){
    this.servicios.mostrarTodosPersonal().subscribe(
      data => {
        this.personal = data;
        console.log(data);
        console.log("Se encontro personal.");
      },
      error => {
        console.error("Error al obtener personal:", error);
      }
    );
  }

  vistaEgresados() {
    this.visibleEgresados = !this.visibleEgresados;
    this.botonUno = this.visibleEgresados ? faChevronUp : faChevronDown;
  }

  vistaAdmin() {
    this.visibleAdmin = !this.visibleAdmin;
    this.botonDos = this.visibleAdmin ? faChevronUp : faChevronDown;
  }

  crearEgresado(egresado:any){
    console.log(this.egresadoM)
    return this.servicios.crearUsuario(egresado).subscribe(
      data=>{
      console.log(data)
      this.buscarEgresados()
      this.egresadoM={}
      },
      error=>{
      console.error(error)
      this.buscarEgresados()
      }
      )
  }

  modificarEgresado(matricula:number, egresado:any){
    return this.servicios.actualizarUsuario(matricula, egresado).subscribe(
      data=>{
        this.egresadoM=data
        console.log(data)
        this.buscarEgresados()
      },
      error=>{
      console.error(error)
      this.buscarEgresados()
      }
      )
  
  }

  eliminarEgresado(matricula:number){
    return this.servicios.eliminarUsuario(matricula).subscribe(
      data =>{
        console.log(data)
        this.buscarEgresados()
      },
      error =>{
        console.error(error)
        this.buscarEgresados()

      }
      )
  }


  crearPersonal(personal:any){
  return this.servicios.crearPersonal(personal).subscribe(
    data=>{
      console.log(data)
      this.buscarPersonal()
      this.personalM={}
    },
    error=>{
    console.error(error);
    this.buscarPersonal()
    }
    )
  }

  modificarPersonal(numTrabajador:number, personal:any ){
  return this.servicios.actualizarPersonal(numTrabajador,personal).subscribe(
    data=>{
      console.log(data)
      this.buscarPersonal()
    },
    error=>{
      console.error(error);
    }
    )
  }

  eliminarPersonal(numTrabajador:number){
    return this.servicios.eliminarPersonal(numTrabajador).subscribe(
      data=>{
      console.log(data)
      this.buscarPersonal()
      },
      error=>{
      console.error(error)
      this.buscarPersonal()
      }
      )
  
  }

  ordenAscendenteE: boolean = true;
  columnaOrdenadaE: string = '';

  ordenarPorColumnaE(columna: string) {
    if (this.columnaOrdenadaE === columna) {
      this.ordenAscendenteE = !this.ordenAscendenteE;
    } else {
      this.columnaOrdenadaE = columna;
      this.ordenAscendenteE = true;
    }

    this.ejecutarOrdenamientoE();
  }

  ejecutarOrdenamientoE() {
    this.egresados.sort((a: any, b: any) => {
      if (a[this.columnaOrdenadaE] < b[this.columnaOrdenadaE]) {
        return this.ordenAscendenteE ? -1 : 1;
      }
      if (a[this.columnaOrdenadaE] > b[this.columnaOrdenadaE]) {
        return this.ordenAscendenteE ? 1 : -1;
      }
      return 0;
    });
  }


  ordenAscendenteP: boolean = true;
  columnaOrdenadaP: string = '';

  ordenarPorColumnaP(columna: string) {
    if (this.columnaOrdenadaP === columna) {
      this.ordenAscendenteP = !this.ordenAscendenteP;
    } else {
      this.columnaOrdenadaP = columna;
      this.ordenAscendenteP = true;
    }

    this.ejecutarOrdenamientoP();
  }

  ejecutarOrdenamientoP() {
    this.personal.sort((a: any, b: any) => {
      if (a[this.columnaOrdenadaP] < b[this.columnaOrdenadaP]) {
        return this.ordenAscendenteP ? -1 : 1;
      }
      if (a[this.columnaOrdenadaP] > b[this.columnaOrdenadaP]) {
        return this.ordenAscendenteP ? 1 : -1;
      }
      return 0;
    });
  }

  terminoBusqueda: string = '';

  filtrarEgresados() {
    return this.egresados.filter((egresado: any) => {
      return Object.values(egresado).some((valor: any) => {
        return valor.toString().toLowerCase().includes(this.terminoBusqueda.toLowerCase());
      });
    });
  }

  terminoBusquedaP: string = '';

  filtrarEgresadosP() {
    return this.personal.filter((egresado: any) => {
      return Object.values(egresado).some((valor: any) => {
        return valor.toString().toLowerCase().includes(this.terminoBusquedaP.toLowerCase());
      });
    });
  }

}