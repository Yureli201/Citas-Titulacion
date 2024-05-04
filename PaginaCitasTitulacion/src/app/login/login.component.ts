import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';


import { Egresado, Personal } from '../servicios/Modelos/Modelos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mostrarBannerUno=false;
  mostrarBannerDos=false;
  mostrarBannerTres=false
  matricula="";
  id:number=0
  usuario:any
  cita: any;

  cambioPagina(){
    if(this.matricula==""){
    this.mostrarBannerUno=true
    }
    else{
      this.id=parseFloat(this.matricula)
        if(isNaN(this.id)){
          this.mostrarBannerTres=true
        }
        else{
          this.buscarUsuario()
        }
    }
  }

  constructor(private route:Router, private servicio:ServiciosService){
    setInterval( ()=> this.mostrarBannerUno = false, 3000)
    setInterval( ()=> this.mostrarBannerDos = false, 3000)
    setInterval( ()=> this.mostrarBannerTres = false, 3000)

  }

  buscarUsuario() {
    this.servicio.loginE(this.id).subscribe(
      data => {
        console.log(data);
        console.log("Matrícula encontrada");
        this.usuario=data
        //setTimeout(() => {this.route.navigate([`/consultar-cita/${this.usuario.matricula}`]);}, 2000);
        this.buscarCita(this.usuario.matricula)
      },
      error => {
        console.error(error);
        this.buscarPersonal()
      }
    );
  }
  
  buscarPersonal() {
    this.servicio.loginP(this.id).subscribe(
      data => {
        console.log(data);
        console.log("Matrícula encontrada");
        this.usuario=data
        setTimeout(() => {this.route.navigate([`/administrar-citas`]);}, 2000);
      },
      error => {
        console.error(error);
      }
    );
  }
  
  buscarCita(mat:number){
    this.servicio.buscarCitaMat(mat).subscribe(
      data => {
        console.log(data);
        console.log("cita encontrada");
        this.cita = data;
        
        // Verificar si al menos una cita tiene estado verdadero
        const algunaCitaActiva = this.cita.some((cita:any) => cita.estado);
        
        if (algunaCitaActiva) {
          this.route.navigate([`/consultar-cita/${this.usuario.matricula}`]);
        } else {
          this.route.navigate([`/crear-cita/${this.usuario.matricula}`]);
        }
      },
      error => {
        console.error(error);
        setTimeout(() => {this.route.navigate([`/crear-cita/${this.usuario.matricula}`]);}, 2000);
      }
    );
  }
  
}
