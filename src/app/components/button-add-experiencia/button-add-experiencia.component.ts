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
    
    tipoid!:number | undefined; 
    tiponame!:string | undefined; 
    public objeto!: experienciaLaboral;
    loginok!:boolean;
    public tipoEmpleoList: tipoempleo[]=[];
    public tipoemepleo!: tipoempleo | undefined;
    mostrartipoempleo!:string | undefined;
    tempObjetoExperiencia!: experienciaLaboral;

    ngOnInit(): void {
      this.tipoemepleo = new tipoempleo(0,"");
      this.tempObjetoExperiencia = new experienciaLaboral (0, "",true, 0,    0,     "","",    "",this.tipoemepleo);
       this.mostrartipoempleo="";
      
      this.getTipoEmpleo();
      
      this.loginok= this.getLogin(); 
    
    }

   
valor(id?: number, nombre?: string ){
  this.tipoid = id;
  this.tiponame=nombre;
  this.mostrartipoempleo=nombre;
 
}


    public getLogin(){
      return this.login.loginok();
  }

    public addExperiencia( ){

      const objetoEmpleo:tipoempleo = new tipoempleo (this.tipoid!, this.tiponame! );
      console.log("Experiencia-TipoEmpleo:    " + this.tipoid + "  " + this.tiponame);

      const checker=(<HTMLInputElement>document.getElementById("myCheck")).checked

      const objeto:experienciaLaboral = new experienciaLaboral (0,
        (<HTMLInputElement>document.getElementById("addNameExperiencia")).value,
        checker,
        parseInt((<HTMLInputElement>document.getElementById("addfechaInicioExperiencia")).value),
        parseInt((<HTMLInputElement>document.getElementById("addfechaFinExperiencia")).value),
        (<HTMLInputElement>document.getElementById("addDescripcionExperiencia")).value,
        (<HTMLInputElement>document.getElementById("addUrlExperiencia")).value,
        (<HTMLInputElement>document.getElementById("addLinkExperiencia")).value,
        objetoEmpleo

        );
       
  
      this.newExperiencia(objeto);

      
 
     /*   Clear Form modal */
     (<HTMLInputElement>document.getElementById("addNameExperiencia")).value="";
     (<HTMLInputElement>document.getElementById("addfechaInicioExperiencia")).value="";
     (<HTMLInputElement>document.getElementById("addfechaFinExperiencia")).value="";
     (<HTMLInputElement>document.getElementById("addDescripcionExperiencia")).value="";
     (<HTMLInputElement>document.getElementById("addUrlExperiencia")).value="";
     (<HTMLInputElement>document.getElementById("addLinkExperiencia")).value="";
     (<HTMLInputElement>document.getElementById("addtipoempleoExperiencia")).value="";

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

cancelar(){
  this.tipoid=0; 
  this.mostrartipoempleo='';
 }

addTipoEmpleo(){

  
  const objeto:tipoempleo = new tipoempleo (0,
    (<HTMLInputElement>document.getElementById("addNameTipoEmpleo")).value );
    this.newTipoEmpleo(objeto);
    const objetoExperiencia:experienciaLaboral = new experienciaLaboral (0, "",true, 0,0,"","","", objeto);
    /* Clear form */
    (<HTMLInputElement>document.getElementById("addNameTipoEmpleo")).value ="";
     
}

public newTipoEmpleo(tipoempleo: tipoempleo):void {
  this.tipoempleoServ.createEmpleo(tipoempleo).subscribe( data => {         
    this.ngOnInit();
    },
    err => {
      alert(err.error.mensaje);
    }
   );  
}

public deleteTipoEmpleo(id: number):void {
  this.tipoempleoServ.borrarEmpleo(id).subscribe(data =>{  
    this.tipoid=0;
    this.ngOnInit(); 
    },
    err => {
      alert(err.error.mensaje);
    }
   );  
}
deletetipo(id: number){
  this.deleteTipoEmpleo(id);
 
  

}


}
