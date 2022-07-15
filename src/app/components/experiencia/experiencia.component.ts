import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { experienciaLaboral } from 'src/app/model/experiencialaboral.model';
import { ExperiencialaboralService } from 'src/app/service/experiencialaboral.service';
import { LoginComponent } from '../login/login.component';
import {TipoempleoService} from 'src/app/service/tipoempleo.service';
import {tipoempleo} from 'src/app/model/tipoempleo.model';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experienciaLaboralList: experienciaLaboral[] = [];
  loginok!: boolean;
  experienciaLaboral!: experienciaLaboral; 
  tempExperienciaLaboral! : experienciaLaboral;
  tempTipoEmpleo! : tipoempleo;
  tipoid!:number | undefined; 
  tiponame!:string | undefined;
  mostrartipoempleo!:string | undefined;
  checkervalue!:boolean; 
  tipoNuevo!:string | undefined;

public tipoEmpleoList: tipoempleo[]=[];

  constructor(private tipoempleoServ: TipoempleoService, private experienciaLaboralService: ExperiencialaboralService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    this.tempTipoEmpleo=new tipoempleo(0,"");
    this.tempExperienciaLaboral = new experienciaLaboral(0,"",true,0,0,"","","",this.tempTipoEmpleo);
    
    this.getExperienciaLaboral();
  
    this.loginok= this.getLogin(); 
  
  }
   
  valor(id?: number, nombre?: string ){
    this.tipoid = id;
    this.tiponame=nombre;
    this.mostrartipoempleo=nombre;
   
  }
  
  public getExperienciaLaboral():void{  
    this.experienciaLaboralService.getExperienciaLaboral().subscribe( { 
     next: (response: experienciaLaboral[] ) => {
       this.experienciaLaboralList = response;          
     },
     error: (error: HttpErrorResponse) => {
       alert("Error" + error.message);
     }
   })      
 }
 
 public updateExperienciaLaboral( experienciaLaboral: experienciaLaboral):void{  
   this.experienciaLaboralService.updateExperienciaLaboral(experienciaLaboral).subscribe( response  => {response=this.experienciaLaboral; });      
 }   



public deleteExperienciaLaboral(id?:number   )  {
     this.experienciaLaboralService.borrarExperienciaLaboral(id).subscribe(data =>{   
   },
   err => {
     alert("Error edu: " + err.error.mensaje);
   }
  );  

}

  
public getLogin(){
   return this.login.loginok();
}

 


saveChanges(id: number ):void{ 

 const objetoEmpleo:tipoempleo = new tipoempleo (this.tipoid!, this.tiponame! );

 let checker=(<HTMLInputElement>document.getElementById("myCheckBox")).checked;
  
 const objeto:experienciaLaboral = new experienciaLaboral (id, 
     (<HTMLInputElement>document.getElementById("nameExperiencia")).value,
     checker,
     parseInt((<HTMLInputElement>document.getElementById("inicioExperiencia")).value),
     parseInt((<HTMLInputElement>document.getElementById("finExperiencia")).value),
     (<HTMLInputElement>document.getElementById("descripcionExperiencia")).value,            
     (<HTMLInputElement>document.getElementById("urlExperiencia")).value,       
     (<HTMLInputElement>document.getElementById("linkPageExperiencia")).value,
     objetoEmpleo    
   
   ); 

 this.updateExperienciaLaboral(objeto);  
 this.reloadComponent(true);
 

}

delete(id?: number){  
 this.deleteExperienciaLaboral(id  );
 this.reloadComponent(true);
}

wait(ms: number){
 let start = new Date().getTime();
 let end = start;
 while(end < start + ms) {
   end = new Date().getTime();
}
}

public reloadComponent(evento: boolean){
 this.wait(1000);  
 this.ngOnInit();  
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

}
