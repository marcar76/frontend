 

export class educacion {

    id?: number;
    nombreeducacion?: string;
    fechainicio?: string;
    fechafin?: string;
    descripcion?:string;
    url?: string;
    link?: string;

constructor(id: number,   
    nombreeducacion: string,     
    fechaInicio: string,   
    fechaFin: string ,    
    descripcion:string, 
    urlfoto: string, 
    linkpage: string     ){


    this.id= id;
    this.nombreeducacion=nombreeducacion;
    this.fechainicio=fechaInicio;
    this.fechafin= fechaFin;     
    this.descripcion= descripcion;
    this.url=urlfoto; 
    this.link=linkpage; 

}
 
}