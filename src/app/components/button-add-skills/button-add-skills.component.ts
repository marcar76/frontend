import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { skills } from 'src/app/model/skills.model';
import { skillsService } from 'src/app/service/skills.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-button-add-skills',
  templateUrl: './button-add-skills.component.html',
  styleUrls: ['./button-add-skills.component.css']
})
export class ButtonEditSkillsComponent   {
 

  constructor( private skillService: skillsService, private login: LoginComponent,private activatedRoute: ActivatedRoute,
    private router: Router) { }

  public objeto!: skills;
  
   
  public addSkill( ){
    /* console.log("Enter addskill");
    console.log("nombre: "+(<HTMLInputElement>document.getElementById("addNameSkill")).value);
    console.log("%: "+ (<HTMLInputElement>document.getElementById("addPercentSkill")).value);
    console.log("url: "+(<HTMLInputElement>document.getElementById("addUrlPhotoSkill")).value); */


    const por: number = parseInt((<HTMLInputElement>document.getElementById("addPercentSkill")).value); 
    const objeto:skills = new skills (0,(<HTMLInputElement>document.getElementById("addNameSkill")).value,por,(<HTMLInputElement>document.getElementById("addUrlPhotoSkill")).value);
    console.log("Add Skill: " +  objeto.conocimiento) ;

    this.newSkill(objeto);
       
  }

  public newSkill(skill: skills):void {
      this.skillService.createSkill(skill).subscribe(
        data => {
          alert("Conocimiento Nuevo Guardado.");
           
        },
        err => {
          alert(err.error.mensaje);
        }
       );  
  }
}
