import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-perfilfoto',
  templateUrl: './perfilfoto.component.html',
  styleUrls: ['./perfilfoto.component.css']
})
export class PerfilfotoComponent implements OnInit {
  public date: Date = new Date();
  persona!: persona /*  = new persona(1,'','','',this.date,'','','','');  */
    
  
  loginok!: boolean;

  constructor(private persoService: PersonaService, private login: LoginComponent )  { }

  ngOnInit(): void {
    this.getPersona();
    this.loginok= this.getLogin();

    console.log("ngOninit--");
  }

   
public getPersona():void{  
  this.persoService.getPersona().subscribe( response  => {this.persona=response} );       
    console.log("GetPersona--");  
}

public updatePersona(p: persona):void{  
  this.persoService.updatePersona(p).subscribe( response  => {response=this.persona;   });    
  console.log("UpdatePersona--");
  
} 
wait(ms: number){
  let start = new Date().getTime();
  let end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

public reloadComponent(evento: boolean){
  this.wait(500);
  this.ngOnInit();  
}

public getLogin(){
  return this.login.loginok();
}


}
