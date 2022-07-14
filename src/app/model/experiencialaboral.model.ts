import { tipoempleo } from "./tipoempleo.model";



export class experienciaLaboral {

    id?: number;
    nombreempresa?: string;
    estrabajoactual?:boolean;
    fechainicio?: string;
    fechafin?: string;
    descripcion?:string;
    url?: string;
    link?: string;
    tipoempleo?: tipoempleo;
    
    /* id: number, this.id= id;*/
constructor(   id: number,
    nombreempresa: string,
    estrabajoactual:boolean,   
    fechaInicio: string,   
    fechaFin: string ,    
    descripcion:string,      
    url:string,
    linkpage: string,
    tipoempleo: tipoempleo
    
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