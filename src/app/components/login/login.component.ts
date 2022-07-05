import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.loginok();
  }

public loginok():boolean{
  //return this.login;
  return true;
}

public setloginok(valor:boolean):boolean{
  this.login=valor; 
  
  return this.login;
}

}
