import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { formulario } from 'src/app/model/formulario.model';
import { formularioService } from 'src/app/service/formulario.service';

@Component({
  selector: 'app-formulario-edit',
  templateUrl: './formulario-edit.component.html',
  styleUrls: ['./formulario-edit.component.css']
})
export class FormularioEditComponent implements OnInit {
  loginok!: boolean;
  public formularioList: formulario[] = [];
   
  formulario!: formulario; 
  tempFormulario! : formulario;
  constructor(  private login: LoginComponent, private formularioService:formularioService )  { }


  ngOnInit(): void {

    this.getFormulario();
  }
  


public getFormulario():void{  
  this.formularioService.getFormulario().subscribe( { 
   next: (response: formulario[] ) => {
     this.formularioList = response;   
      
   },
   error: (error: HttpErrorResponse) => {
     alert("Horror" + error.message);
   }
 })      
}

public updateFormulario( formulario: formulario):void{  
 this.formularioService.updateFormulario(formulario).subscribe( response  => {response=this.formulario;alert("Formulario actualizado.");});      
}   



public deleteFormulario(id?:number   )  {
   this.formularioService.borrarFormulario(id).subscribe(data =>{  alert("Formulario eliminado.");
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
/* 
const por: number = parseInt((<HTMLInputElement>document.getElementById("percentSkill")).value); 
const objeto:formulario = new formulario (id,(<HTMLInputElement>document.getElementById("nameSkill")).value,
        por,(<HTMLInputElement>document.getElementById("urlFhotoSkill")).value);
console.log("Edit formulario: " +  objeto.nombre) ;

this.updateFormulario(objeto);
*/
}

delete(id?: number){  
this.deleteFormulario(id  );

}





}
