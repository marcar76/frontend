export class educacion {

    id?: number;
    nombreeducacion?: string;
    fechainicio?: Date;
    fechafin?: Date;
    descripcion?:string;
    url?: string;

constructor(id: number,   nombreeducacion: string,     fechaInicio: Date,   fechaFin: Date ,    descripcion:string, urlfoto: string){
    this.id= id;
    this.nombreeducacion=nombreeducacion;
    this.fechainicio=fechaInicio;
    this.fechafin= fechaFin;     
    this.descripcion= descripcion;
    this.url=urlfoto; 
}
 
}