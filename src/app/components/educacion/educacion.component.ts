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
    
      this.tempEducacion = new educacion(0,"","","","","","");
    
      this.getEducacion();
    
      this.loginok= this.getLogin(); 
    
  }
 

  public getEducacion():void{  
     this.educacionService.getEducacion().subscribe( { 
      next: (response: educacion[] ) => {
        this.educacionList = response;  
         
         
      },
      error: (error: HttpErrorResponse) => {
        alert("Error" + error.message);
      }
    })      
  }
  
  public updateEducacion( educacion: educacion):void{  
    this.educacionService.updateEducacion(educacion).subscribe( response  => {response=this.educacion; });      
  }   

 

public deleteEducacion(id?:number   )  {
      this.educacionService.borrarEducacion(id).subscribe(data =>{   
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

    
  const objeto:educacion = new educacion (id, 
      (<HTMLInputElement>document.getElementById("nameEducacion")).value,
      (<HTMLInputElement>document.getElementById("inicioEducacion")).value,
      (<HTMLInputElement>document.getElementById("finEducacion")).value,       
      (<HTMLInputElement>document.getElementById("descripcionEducacion")).value,       
      (<HTMLInputElement>document.getElementById("urlFotoEducacion")).value,
      (<HTMLInputElement>document.getElementById("linkPageEducacion")).value    
    
    );
  
  
  console.log("Edit Educ: " +  objeto.descripcion) ;

  this.updateEducacion(objeto);  
  this.reloadComponent(true);
}

delete(id?: number){  
  this.deleteEducacion(id  );
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


}
