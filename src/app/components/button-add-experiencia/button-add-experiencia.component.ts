import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { experienciaLaboral } from 'src/app/model/experiencialaboral.model';
import { ExperiencialaboralService } from 'src/app/service/experiencialaboral.service';

@Component({
  selector: 'app-button-add-experiencia',
  templateUrl: './button-add-experiencia.component.html',
  styleUrls: ['./button-add-experiencia.component.css']
})
  
export class ButtonAddExperienciaComponent   {

  @Output() newExperienciaEvent = new EventEmitter<boolean>();

  constructor(private experienciaServ: ExperiencialaboralService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router) { }

    public objeto!: experienciaLaboral;
  
   
    public addExperiencia( ){
           
      const objeto:experienciaLaboral = new experienciaLaboral (0,
        (<HTMLInputElement>document.getElementById("addNameExperiencia")).value,
        true,
        (<HTMLInputElement>document.getElementById("addfechaInicioExperiencia")).value,
        (<HTMLInputElement>document.getElementById("addfechaFinExperiencia")).value,
        (<HTMLInputElement>document.getElementById("addDescripcionExperiencia")).value,
        (<HTMLInputElement>document.getElementById("addUrlExperiencia")).value,
        (<HTMLInputElement>document.getElementById("addLinkExperiencia")).value,
        (<HTMLInputElement>document.getElementById("addtipoempleoExperiencia")).value
        );
       
  
      this.newExperiencia(objeto);
 
      //Clear Form modal
    /*   (<HTMLInputElement>document.getElementById("addNameProyecto")).value="";
      (<HTMLInputElement>document.getElementById("addDescripcionProyecto")).value="";
      (<HTMLInputElement>document.getElementById("addLinkProyecto")).value="";
      (<HTMLInputElement>document.getElementById("addUrlFotoProyecto")).value="";
*/
      this.newExperienciaEvent.emit(false);
          
    }
  
    public newExperiencia(experienciaLaboral: experienciaLaboral):void {
        this.experienciaServ.createExperienciaLaboral(experienciaLaboral).subscribe( data => {         
             
          },
          err => {
            alert(err.error.mensaje);
          }
         );  
    }

addTipoEmpleo(){
  
}



}
