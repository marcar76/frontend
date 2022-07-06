

export class experienciaLaboral {

    id?: number;
    nombreempresa?: string;
    estrabajoactual?:boolean;
    fechainicio?: string;
    fechafin?: string;
    descripcion?:string;
    url?: string;
    link?: string;
    tipoempleo?:string;

constructor(id: number,   
    nombreempresa: string,
    estrabajoactual:boolean,   
    fechaInicio: string,   
    fechaFin: string ,    
    descripcion:string,      
    url:string,
    linkpage: string,
    tipoempleo:string
         )
    {



    this.id= id;
    this.nombreempresa=nombreempresa;
    this.estrabajoactual=estrabajoactual;
    this.fechainicio=fechaInicio;
    this.fechafin= fechaFin;     
    this.descripcion= descripcion;    
    this.url=url;
    this.link=linkpage; 
    this.tipoempleo=tipoempleo;

}
 
}