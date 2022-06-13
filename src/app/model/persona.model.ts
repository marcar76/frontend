export class persona {

    id?: number;
    nombre?: string;
    apellido?: string;
    domicilio?: string;
    fechaNacimiento?: Date;
    telefono?: string;
    correo?: string;
    sobre_mi?: string;
    url_foto?:string;

constructor(id: number,    nombre: string,    apellido: string,    domicilio: string,    fechaNacimiento: Date,    telefono: string,
    correo: string,    sobre_mi: string,    url_foto:string){
this.id= id;
    this.nombre=nombre;
    this.apellido= apellido;
    this.domicilio=domicilio;
    this.fechaNacimiento= fechaNacimiento;
    this.telefono= telefono;
    this.correo= correo;
    this.sobre_mi= sobre_mi;
    this.url_foto=url_foto;
}
 
}