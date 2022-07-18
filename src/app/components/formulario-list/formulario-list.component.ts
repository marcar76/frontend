import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { formulario } from 'src/app/model/formulario.model';
import { formularioService } from 'src/app/service/formulario.service';

@Component({
  selector: 'app-formulario-list',
  templateUrl: './formulario-list.component.html',
  styleUrls: ['./formulario-list.component.css']
})
export class FormularioEditComponent implements OnInit {
  loginok!: boolean;
  public formularioList: formulario[] = [];
   mostrar:boolean=false;
  formulario!: formulario; 
  tempFormulario! : formulario;
  constructor(  private login: LoginComponent, private formularioService:formularioService )  { }


  ngOnInit(): void {
    this.tempFormulario = new formulario(0,"","","","","");
    this.getFormulario();
  }
  


public getFormulario():void{  
  this.formularioService.getFormulario().subscribe( { 
   next: (response: formulario[] ) => {
     this.formularioList = response;   
      
   },
 /*   error: (error: HttpErrorResponse) => {
     alert("Horror" + error.message);
   } */
 })      
}

public updateFormulario( formulario: formulario):void{  
 this.formularioService.updateFormulario(formulario).subscribe( response  => {response=this.formulario;this.ngOnInit();});  
     
}   



public deleteFormulario(id?:number   )  {
   this.formularioService.borrarFormulario(id).subscribe(data =>{   
   this.ngOnInit();
 },
 err => {
   alert(err.error.mensaje);
 }
 
);  

}


public getLogin(){
 return this.login.loginok();
}

edit(id: number ):void{
console.log("Edit: " + id);
 
  
const objeto:formulario = new formulario (id,
  (<HTMLInputElement>document.getElementById("nameFormulario")).value,
  (<HTMLInputElement>document.getElementById("correoFormulario")).value,
  (<HTMLInputElement>document.getElementById("asuntoFormulario")).value,
  (<HTMLInputElement>document.getElementById("mensajeFormulario")).value,
  (<HTMLInputElement>document.getElementById("notasFormulario")).value
);
  
console.log("Edit formulario: " +  objeto.nombre) ;

this.updateFormulario(objeto);
 
}

delete(id?: number){  
this.deleteFormulario(id  );

}





}
