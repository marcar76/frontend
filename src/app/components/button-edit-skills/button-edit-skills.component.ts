import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-button-edit-skills',
  templateUrl: './button-edit-skills.component.html',
  styleUrls: ['./button-edit-skills.component.css']
})
export class ButtonEditSkillsComponent implements OnInit {

  @Input() idConocimiento!:number;
  @Input() nombreConocimiento!:string;
  @Input() porcentajeConocimiento!:number;
  @Input() urlConocimiento!:string;



  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
/* console.log('nameSkill:' + this.nombreConocimiento); */
  /* Mostrar el contenido anterior en el modal para poder editar*/
  /* (<HTMLInputElement>document.getElementById("nameSkill")).value =  this.nombreConocimiento; */
 /*console.log('nameSkill111:' + this.nombreConocimiento +"   ID: " + this.idConocimiento);*/
  
  /* (<HTMLInputElement>document.getElementById("porcentajeSkill")).value = this.porcentajeConocimiento.toString();
  (<HTMLInputElement>document.getElementById("urlFotoSkill")).value = this.urlConocimiento; */

  }


  edit(){

  }

  delete(){

  }
}
