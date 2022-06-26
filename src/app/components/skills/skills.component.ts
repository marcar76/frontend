import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  
  /* public updateSkill(id: number, skill: skills):void{  
    this.skillService.updateSkill(id, skill).subscribe( response  => {response=this.skills});      
  } 
 */
  public deleteSkill(id:number):void {
    this.skillService.borrarSkills(id).subscribe(data =>{this.getSkills();} );
  }

   
  public getLogin(){
    return this.login.loginok();
  }

public addskill(){}

edit(id1: number | undefined):void{
  console.log("Edit: " + id1);
}

delete(id: number| undefined){
  
  console.log("Delete: " + id);
}


}
