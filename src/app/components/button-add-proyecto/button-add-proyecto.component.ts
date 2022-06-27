import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { proyecto } from 'src/app/model/proyecto.model';
import { proyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-button-add-proyecto',
  templateUrl: './button-add-proyecto.component.html',
  styleUrls: ['./button-add-proyecto.component.css']
})
export class ButtonAddProyectoComponent   {

  constructor(private proyectoServ: proyectoService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router) { }

    public objeto!: proyecto;
  
   
    public addProyecto( ){
           
      const objeto:proyecto = new proyecto (0,
        (<HTMLInputElement>document.getElementById("addNameProyecto")).value,
        (<HTMLInputElement>document.getElementById("addDescripcionProyecto")).value,
        (<HTMLInputElement>document.getElementById("addLinkProyecto")).value,
        (<HTMLInputElement>document.getElementById("addUrlFotoProyecto")).value
        );
      console.log("Add Proyecto: " +  objeto.nombreProyecto) ;
  
      this.newProyecto(objeto);
         
    }
  
    public newProyecto(proyecto: proyecto):void {
        this.proyectoServ.createProyecto(proyecto).subscribe(
          data => {
            alert("Proyecto Nuevo Guardado.");
             
          },
          err => {
            alert(err.error.mensaje);
          }
         );  
    }
}
