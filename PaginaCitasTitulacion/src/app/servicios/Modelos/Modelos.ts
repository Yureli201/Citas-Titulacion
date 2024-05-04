export interface Egresado{
matricula:number|null,
nombre:string,
nivelTitulacion:string,
generacion:string,
carreraTitulacion:string,
correo:string,
telefono:number|'',
curp:string,
}

export interface Citas{
matriculaEgresado:number,
fecha:string,
hora:string
}

export interface Personal{
numeroTrabajador:number|null,
nombre:string
}