import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogged = false;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
     
    } else {
      this.isLogged = false;
    }
    console.log("IsLogged in MENU: " + this.isLogged);
  }

}
