import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { skills } from 'src/app/model/skills.model';
import { skillsService } from 'src/app/service/skills.service';
import { LoginComponent } from '../auth/login.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],

})
export class SkillsComponent implements OnInit {

  public skillsList: skills[] = [];
  isLogged = false;
  skill!: skills;
  tempSkill!: skills;
  roles!: string[];
  isAdmin = false;



  constructor(private skillService: skillsService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tempSkill = new skills(0, "", 0, "");


    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.getSkills();

  }

  public getSkills(): void {
    this.skillService.getSkill().subscribe({
      next: (response: skills[]) => {
        this.skillsList = response;

      },
      /*  error: (error: HttpErrorResponse) => {
         alert("Horror" + error.message);
       } */
    })
  }

  public updateSkill(skill: skills): void {
    this.skillService.updateSkill(skill).subscribe(response => { response = this.skill; });


  }


  public deleteSkill(id?: number) {
    this.skillService.borrarSkill(id).subscribe(data => {
    },
      err => {
        alert(err.error.mensaje);
      }
    );

  }



  edit(id: number): void {

    const por: number = parseInt((<HTMLInputElement>document.getElementById("percentSkill")).value);
    const objeto: skills = new skills(id, (<HTMLInputElement>document.getElementById("nameSkill")).value, por, (<HTMLInputElement>document.getElementById("urlFhotoSkill")).value);

    this.updateSkill(objeto);
    this.reloadComponent(true);

  }

  delete(id?: number) {
    this.deleteSkill(id);
    this.reloadComponent(true);

  }

  wait(ms: number) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  public reloadComponent(evento: boolean) {
    this.wait(1000);
    this.ngOnInit();
  }









}
