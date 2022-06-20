import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginok!: boolean;
  constructor(private login: LoginComponent) { }

  ngOnInit(): void {
    this.loginok= this.getLogin();
  }

  public getLogin(){
    return this.login.loginok();
  }

}
