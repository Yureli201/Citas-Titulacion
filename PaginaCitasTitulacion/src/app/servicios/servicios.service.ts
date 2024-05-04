import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Egresado, Citas, Personal } from './Modelos/Modelos';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  URL='http://localhost:3300/citas'
  constructor( private http: HttpClient) { }

  loginE(matricula:number){
    return this.http.get(`${this.URL}/egresado/${matricula}`)
  }
  loginP(matricula:number){
    return this.http.get(`${this.URL}/personal/${matricula}`)
  }

  crearCita(matricula:number, cita:Citas){
    return this.http.post(`${this.URL}/consultar/${matricula}`, cita)
  }

  buscarCitaMat(matricula:number){
    return this.http.get(`${this.URL}/consultar/matricula/${matricula}`)
  }

  cargarFormulario(matricula:number){
    return this.http.get(`${this.URL}/egresados/${matricula}/editar`)
  }

  actualizarCita(matricula:number, cita:any){
    return this.http.post(`${this.URL}/${matricula}/guardarCita`, cita)
  }

  eliminarCita(matricula:number){
    return this.http.delete(`${this.URL}/eliminar/${matricula}`)
  }

  mostrarTodasCitas(){
    return this.http.get(`${this.URL}/administrarCitas`)
  }

  mostrarCita(matricula:number){
    return this.http.get(`${this.URL}/${matricula}/editar`)
  }
  
  buscarHorarios(fecha:string){
    return this.http.get(`${this.URL}/consultar/horarios/${fecha}`)
  }

  mostrarTodosUsuarios(){
    return this.http.get(`${this.URL}/administrarUsuarios`)
  }

  mostrarTodosPersonal(){
    return this.http.get(`${this.URL}/administrarPersonal`)
  }

  mostrarUsuario(matricula:number){
    return this.http.get(`${this.URL}/egresados/${matricula}/editar`)
  }

  actualizarUsuario(matricula:number, usuario:Egresado){
    return this.http.post(`${this.URL}/egresados/${matricula}/editar`,usuario)
  }

  eliminarUsuario(matricula:number){
    return this.http.delete(`${this.URL}/egresados/${matricula}/eliminar`)
  }

  mostrarPersonal(matricula:number){
    return this.http.get(`${this.URL}/personal/${matricula}/editar`)
  }

  actualizarPersonal(matricula:number, personal:Personal){
    return this.http.post(`${this.URL}/personal/${matricula}/editar`,personal)
  }

  eliminarPersonal(matricula:number){
    return this.http.delete(`${this.URL}/personal/${matricula}/eliminar`)
  }

  crearUsuario(egresado:Egresado){
    return this.http.post(`${this.URL}/egresados/agregar`,egresado)
  }

  crearPersonal(personal:Personal){
    return this.http.post(`${this.URL}/personal/agregar`,personal)
  }

  agregarFechas(fechas:any){
    return this.http.post(`${this.URL}/fechas/agregar`,fechas)
  }

  mostrarFechas(){
    return this.http.get(`${this.URL}/fechas/obtener`)
  }

  eliminarFechas(fechas:any){
    return this.http.post(`${this.URL}/fechas/eliminar`,fechas)
  }

  eliminarTodasFechas(){
    return this.http.delete(`${this.URL}/fechas/eliminarTodas`,)
  }

}
