import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { LoginComponent } from '../auth/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  roles!: string[];

  isAdmin = false;
  
  constructor(  private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;

    } else {
      this.isLogged = false;
    }

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

     
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }









}
