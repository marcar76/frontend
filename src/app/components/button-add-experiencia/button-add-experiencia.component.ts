import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { experienciaLaboral } from 'src/app/model/experiencialaboral.model';
import { ExperiencialaboralService } from 'src/app/service/experiencialaboral.service';
import {TipoempleoService} from 'src/app/service/tipoempleo.service';
import {tipoempleo} from 'src/app/model/tipoempleo.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-button-add-experiencia',
  templateUrl: './button-add-experiencia.component.html',
  styleUrls: ['./button-add-experiencia.component.css']
})
  
export class ButtonAddExperienciaComponent   {

  @Output() newExperienciaEvent = new EventEmitter<boolean>();

  constructor(private tipoempleoServ: TipoempleoService,private experienciaServ: ExperiencialaboralService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router) { }

    public objeto!: experienciaLaboral;
  
    public tipoEmpleoList: tipoempleo[]=[];
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

/* T I P O   D E   E M P L E O */

public getTipoEmpleo():void{  
  this.tipoempleoServ.getEmpleo().subscribe( { 
   next: (response: tipoempleo[] ) => {
     this.tipoEmpleoList = response;          
   },
   error: (error: HttpErrorResponse) => {
     alert("Error" + error.message);
   }
 })      
}


addTipoEmpleo(){
  const objeto:tipoempleo = new tipoempleo (0,
    (<HTMLInputElement>document.getElementById("addNameTipoEmpleo")).value );
    this.newTipoEmpleo(objeto);
    (<HTMLInputElement>document.getElementById("addNameTipoEmpleo")).value ="";
}

public newTipoEmpleo(tipoempleo: tipoempleo):void {
  this.tipoempleoServ.createEmpleo(tipoempleo).subscribe( data => {         
       
    },
    err => {
      alert(err.error.mensaje);
    }
   );  
}




}
