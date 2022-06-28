export class educacion {

    id?: number;
    nombreeducacion?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    descripcion?:string;

constructor(id: number,   nombreeducacion: string,     fechaInicio: Date,   fechaFin: Date ,    descripcion:string){
    this.id= id;
    this.nombreeducacion=nombreeducacion;
     
    this.fechaInicio=fechaInicio;
    this.fechaFin= fechaFin;
     
    this.descripcion= descripcion;
     
}
 
}