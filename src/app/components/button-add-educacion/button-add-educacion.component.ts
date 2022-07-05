import { Component, OnInit,Output, EventEmitter } from '@angular/core';
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

  @Output() newEducacionEvent = new EventEmitter<boolean>();
  constructor(private educacionServ: educacionService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router) { }

    public objeto!: educacion;
  
   
    public addEducacion( ){
           
      const objeto:educacion = new educacion (0,
        (<HTMLInputElement>document.getElementById("addNameEducacion")).value,
        (<HTMLInputElement>document.getElementById("fechaInicioEducacion")).value,
        (<HTMLInputElement>document.getElementById("fechaFinEducacion")).value,       
        (<HTMLInputElement>document.getElementById("addDescripcionEducacion")).value,       
        (<HTMLInputElement>document.getElementById("addUrlFotoEducacion")).value,
        (<HTMLInputElement>document.getElementById("addLinkEducacion")).value    
        

        );  


        
  
      this.newEducacion(objeto);
       
      (<HTMLInputElement>document.getElementById("addNameEducacion")).value="";
      (<HTMLInputElement>document.getElementById("addDescripcionEducacion")).value="";
      (<HTMLInputElement>document.getElementById("addLinkEducacion")).value="";
      (<HTMLInputElement>document.getElementById("fechaInicioEducacion")).value="";
      (<HTMLInputElement>document.getElementById("fechaFinEducacion")).value="";
      (<HTMLInputElement>document.getElementById("addUrlFotoEducacion")).value="";

      this.newEducacionEvent.emit(false);
    }
  
    public newEducacion(educacion: educacion):void {
        this.educacionServ.createEducacion(educacion).subscribe(
          data => { 
          },
          err => {
            alert(err.error.mensaje);
          }
         );  
    }
}
