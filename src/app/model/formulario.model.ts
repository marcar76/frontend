export class formulario {

    id?: number;
    nombre?: string;
    correo?: string;
    asunto?: string;
    mensaje?:string;
    notas?: string;

constructor(id: number, nombre: string, correo:string, asunto:string, mensaje: string, notas: string){
    this.id= id;
    this.nombre=nombre;
    this.correo=correo;
    this.asunto=asunto; 
    this.mensaje=mensaje; 
    this.notas=notas;

}
 
}