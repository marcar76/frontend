import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { educacion } from 'src/app/model/educacion.model';
import { educacionService } from 'src/app/service/educacion.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-button-add-educacion',
  templateUrl: './button-add-educacion.component.html',
  styleUrls: ['./button-add-educacion.component.css']
})
export class ButtonAddEducacionComponent  {

  constructor(private educacionServ: educacionService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router) { }

    public objeto!: educacion;
  
   
    public addEducacion( ){
           
     /*  const objeto:educacion = new educacion (0,
        (<HTMLInputElement>document.getElementById("addNameEducacion")).value,
        (<HTMLInputElement>document.getElementById("addDescripcionEducacion")).value,
        */
        /* FECHAS */
/*
        (<HTMLInputElement>document.getElementById("addUrlFotoEducacion")).value
        );  
        console.log("Add educacion: " +  objeto.nombreeducacion) ;
  
      this.newEducacion(objeto);
       */   
    }
  
    public newEducacion(educacion: educacion):void {
        this.educacionServ.createEducacion(educacion).subscribe(
          data => {
            alert("Educacion Nuevo Guardado.");
             
          },
          err => {
            alert(err.error.mensaje);
          }
         );  
    }
}
