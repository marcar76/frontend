

export class experienciaLaboral {

    id?: number;
    nombreempresa?: string;
    estrabajoactual?:boolean;
    fechainicio?: string;
    fechafin?: string;
    descripcion?:string;
    link?: string;

constructor(id: number,   
    nombreempresa: string,
    estrabajoactual:boolean,   
    fechaInicio: string,   
    fechaFin: string ,    
    descripcion:string,      
    linkpage: string     )
    {



    this.id= id;
    this.nombreempresa=nombreempresa;
    this.estrabajoactual=estrabajoactual;
    this.fechainicio=fechaInicio;
    this.fechafin= fechaFin;     
    this.descripcion= descripcion;    
    this.link=linkpage; 

}
 
}