import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-perfilfoto',
  templateUrl: './perfilfoto.component.html',
  styleUrls: ['./perfilfoto.component.css']
})
export class PerfilfotoComponent implements OnInit {
  public date: Date = new Date();
  persona: persona= new persona(1,'','','',this.date,'','','','');
  public editPersona?: persona;

  constructor(private persoService: PersonaService) { }

  ngOnInit(): void {
    this.getPersona();
     
  }


public getPersona():void{
  
  this.persoService.getPersona().subscribe( response  => {this.persona=response});
    
      
    
}

}
