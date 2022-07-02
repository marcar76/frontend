import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formulario } from 'src/app/model/formulario.model';
import { LoginComponent } from '../login/login.component';
import{formularioService} from '../../service/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent   {
  loginok!: boolean;
  formulario!: formulario;

  constructor(private formularioServ: formularioService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(){
    this.loginok= this.getLogin();

  } 
public getLogin(){
    return this.login.loginok();
}

  addFormulario(){

  const objeto:formulario = new formulario (0,
    (<HTMLInputElement>document.getElementById("name")).value,
    (<HTMLInputElement>document.getElementById("email")).value,
    (<HTMLInputElement>document.getElementById("subject")).value,
    (<HTMLInputElement>document.getElementById("message")).value,
    ""
    );
   

  this.newFormulario(objeto);
}
public newFormulario(formulario: formulario):void {
  this.formularioServ.createFormulario(formulario).subscribe(
    data => {
      alert("Formulario Enviado.");
       
    },
    err => {
      alert(err.error.mensaje);
    }
   );  
}
}
