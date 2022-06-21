 
export class skills{
        id?: number;
        conocimiento?: string;        
        urlfoto?:string;
        porcentaje?: number;
    
    constructor(id: number, conocimiento: string, porcentaje: number , urlfoto:string){
        this.id= id;
        this.conocimiento= conocimiento;
        this.urlfoto=urlfoto;
        this.porcentaje= porcentaje;
        
    }
}