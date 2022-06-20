import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }


  edit(){

  }

  delete(){

  }
}
