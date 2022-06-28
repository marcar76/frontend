import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { skills } from 'src/app/model/skills.model';
import { skillsService } from 'src/app/service/skills.service';
import { LoginComponent } from '../login/login.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
 

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  
  public skillsList: skills[] = [];
  loginok!: boolean;
  skill!: skills; 
  tempSkill! : skills;
  
  constructor(private skillService: skillsService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router )  { }

  ngOnInit(): void {
    this.tempSkill = new skills(0,"",0,"");
    
    this.getSkills();
    
    this.loginok= this.getLogin(); 
    
  }

  public getSkills():void{  
     this.skillService.getSkill().subscribe( { 
      next: (response: skills[] ) => {
        this.skillsList = response;  
         
      },
      error: (error: HttpErrorResponse) => {
        alert("Horror" + error.message);
      }
    })      
  }
  
  public updateSkill( skill: skills):void{  
    this.skillService.updateSkill(skill).subscribe( response  => {response=this.skill;alert("Conocimiento actualizado.");});      
  }   

 

public deleteSkill(id?:number   )  {
      this.skillService.borrarSkill(id).subscribe(data =>{  alert("Conocimiento eliminado.");
    },
    err => {
      alert(err.error.mensaje);
    }
   );  

}

   
public getLogin(){
    return this.login.loginok();
}
 
edit(id: number ):void{
  console.log("Edit: " + id);

  const por: number = parseInt((<HTMLInputElement>document.getElementById("percentSkill")).value); 
  const objeto:skills = new skills (id,(<HTMLInputElement>document.getElementById("nameSkill")).value,por,(<HTMLInputElement>document.getElementById("urlFhotoSkill")).value);
  console.log("Edit Skill: " +  objeto.conocimiento) ;

  this.updateSkill(objeto);
}

delete(id?: number){  
  this.deleteSkill(id  );

}


}
