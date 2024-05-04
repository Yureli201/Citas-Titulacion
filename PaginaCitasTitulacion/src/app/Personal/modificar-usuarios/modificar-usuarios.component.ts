import { Component } from '@angular/core';
import { Egresado } from 'src/app/servicios/Modelos/Modelos';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.component.html',
  styleUrls: ['./modificar-usuarios.component.css']
})
export class ModificarUsuariosComponent {
nivel:string="Licenciatura/Ingeniería";

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
}

}
