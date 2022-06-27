export class proyecto{
    id?: number;
    nombreProyecto?: string;  
    descripcionProyecto?: string;
    linkProyecto?: string;
    urlfotoProyecto?:string;
    

constructor(id: number, nombreProyecto: string, descripcionProyecto: string,
    linkProyecto: string,  urlfotoProyecto:string){
    this.id= id;
    this.nombreProyecto=nombreProyecto;
    this.descripcionProyecto=descripcionProyecto;
    this.linkProyecto=linkProyecto;
    this.urlfotoProyecto=urlfotoProyecto;
}
}