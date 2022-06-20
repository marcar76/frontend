 
export class skills{
        id?: number;
        conocimiento?: string;        
        url_foto?:string;
        porcentaje?: number;
    
    constructor(id: number,    conocimiento: string, url_foto:string, porcentaje: number ){
        this.id= id;
        this.conocimiento= conocimiento;
        this.url_foto=url_foto;
        this.porcentaje= porcentaje;
        
    }
}