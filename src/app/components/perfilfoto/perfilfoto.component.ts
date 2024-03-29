import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { LoginComponent } from '../auth/login.component';


@Component({
  selector: 'app-perfilfoto',
  templateUrl: './perfilfoto.component.html',
  styleUrls: ['./perfilfoto.component.css']
})
export class PerfilfotoComponent implements OnInit {
  public date: Date = new Date();
  persona!: persona

  isLogged = false;
  roles!: string[];
  isAdmin = false;

  constructor(private persoService: PersonaService, private tokenService: TokenService, private toastr: ToastrService) { }

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
    this.getPersona();

  }

  public getPersona(): void {
    this.persoService.getPersona().subscribe(response => { this.persona = response });

  } 
  
  wait(ms: number) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  public reloadComponent(evento: boolean) {
    this.wait(500);
    this.ngOnInit();
  } 
}
