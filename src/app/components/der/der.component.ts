import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-der',
  templateUrl: './der.component.html',
  styleUrls: ['./der.component.css']
})
export class DerComponent implements OnInit {


  isLogged = false;
  roles!: string[];
  isAdmin = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {


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

}
