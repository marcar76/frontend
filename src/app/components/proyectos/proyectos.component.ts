import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { proyecto } from 'src/app/model/proyecto.model';
import { proyectoService } from 'src/app/service/proyecto.service';
import { LoginComponent } from '../login/login.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectoList: proyecto[]= [] ;
  loginok!: boolean;
  proyecto!: proyecto; 
  tempProyecto! : proyecto;

  constructor(private proyectoService: proyectoService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.tempProyecto = new proyecto(0,"","","","");
    
    this.getProyecto();
    console.log("Proyectos: " +this.proyectoList);
    this.loginok= this.getLogin(); 
  }

  public getProyecto():void{  
    this.proyectoService.getProyectos().subscribe( { 
     next: (response: proyecto[] ) => {
       this.proyectoList = response; console.log(this.proyectoList);
        
     },
     error: (error: HttpErrorResponse) => {
       alert("Error" + error.message);
     }
   })      
 }
 
 public updateProyecto( proyecto: proyecto):void{  
   this.proyectoService.updateProyecto(proyecto).subscribe( response  => {response=this.proyecto;alert("Proyecto actualizado.");});      
 }   



public deleteProyecto(id?:number   )  {
     this.proyectoService.borrarProyecto(id).subscribe(data =>{  alert("Proyecto eliminado.");
   },
   err => {
     alert("Error: " + err.error.mensaje);
   }
  );  

}

  
public getLogin(){
   return this.login.loginok();
}

edit(id: number ):void{
   
 const objeto:proyecto = new proyecto (
    id,
    (<HTMLInputElement>document.getElementById("nameProyecto")).value,
    (<HTMLInputElement>document.getElementById("descripcionProyecto")).value,
    (<HTMLInputElement>document.getElementById("linkProyecto")).value ,
    (<HTMLInputElement>document.getElementById("urlFotoProyecto")).value
    );


 console.log("Edit Proyecto: " +  objeto.nombreProyecto) ;

 this.updateProyecto(objeto);
}

delete(id?: number){  
 this.deleteProyecto(id  );

}

}
