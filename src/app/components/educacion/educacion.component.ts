import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { educacion } from 'src/app/model/educacion.model';
import { educacionService } from 'src/app/service/educacion.service';
import { LoginComponent } from '../login/login.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educacionList: educacion[] = [];
  loginok!: boolean;
  educacion!: educacion; 
  tempEducacion! : educacion;
  
  
  constructor(private educacionService: educacionService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router )  { }
public date: Date = new Date();
  ngOnInit(): void {
    
    this.tempEducacion = new educacion(0,"",this.date,this.date,"","");
    
    this.getEducacion();
    
    this.loginok= this.getLogin(); 
    
  }

fechaCambiar(fecha: Date){

  let splitted = fecha.toString().split(","); 
  let fechaReturn:Date = new Date (splitted[0]+"-"+splitted[1]+"-"+splitted[2]);
   return fechaReturn;

}


  public getEducacion():void{  
     this.educacionService.getEducacion().subscribe( { 
      next: (response: educacion[] ) => {
        this.educacionList = response;  
        console.log(this.educacionList);
         
      },
      error: (error: HttpErrorResponse) => {
        alert("Error" + error.message);
      }
    })      
  }
  
  public updateEducacion( educacion: educacion):void{  
    this.educacionService.updateEducacion(educacion).subscribe( response  => {response=this.educacion;alert("Educacion actualizado.");});      
  }   

 

public deleteEducacion(id?:number   )  {
      this.educacionService.borrarEducacion(id).subscribe(data =>{  alert("Educacion eliminado.");
    },
    err => {
      alert("Error edu: " + err.error.mensaje);
    }
   );  

}

   
public getLogin(){
    return this.login.loginok();
}
 
edit(id: number ):void{
  console.log("Edit: " + id);

  /* const por: number = parseInt((<HTMLInputElement>document.getElementById("percentSkill")).value); 
  const objeto:educacion = new educacion (id,(<HTMLInputElement>document.getElementById("nameSkill")).value,por,(<HTMLInputElement>document.getElementById("urlFhotoSkill")).value);
  console.log("Edit Skill: " +  objeto.conocimiento) ;

  this.updateSkill(objeto); */
}

delete(id?: number){  
  this.deleteEducacion(id  );

}


}
