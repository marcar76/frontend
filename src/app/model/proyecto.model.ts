export class proyecto{
    id?: number;
    nombreproyecto?: string;  
    descripcion?: string;
    link?: string;
    urlfoto?:string;
    

constructor(id: number, nombreProyecto: string, descripcionProyecto: string,
    linkProyecto: string,  urlfotoProyecto:string){
    this.id= id;
    this.nombreproyecto=nombreProyecto;
    this.descripcion=descripcionProyecto;
    this.link=linkProyecto;
    this.urlfoto=urlfotoProyecto;
}
}