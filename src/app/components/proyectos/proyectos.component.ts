import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { proyecto } from 'src/app/model/proyecto.model';
import { proyectoService } from 'src/app/service/proyecto.service';
import { LoginComponent } from '../auth/login.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectoList: proyecto[] = [];


  proyecto!: proyecto;
  tempProyecto!: proyecto;

  isLogged = false;
  roles!: string[];
  isAdmin = false;

  constructor(private proyectoService: proyectoService, private tokenService: TokenService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService,) { }

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


    this.tempProyecto = new proyecto(0, "", "", "", "");

    this.getProyecto();

  }

  public getProyecto(): void {
    this.proyectoService.getProyectos().subscribe({
      next: (response: proyecto[]) => {
        this.proyectoList = response;

      },
      error: (error: HttpErrorResponse) => {
        /* alert("Error" + error.message);  */
        /* this.toastr.error("Proyecto" , 'Fail', {
           timeOut: 10000,  positionClass: 'toast-top-center',
         });*/

      }
    })
  }

  public updateProyecto(proyecto: proyecto): void {
    this.proyectoService.updateProyecto(proyecto).subscribe(response => { response = this.proyecto; });
  }



  public deleteProyecto(id?: number) {
    this.proyectoService.borrarProyecto(id).subscribe(data => {
      ;
    },
      err => {
        alert("Error: " + err.error.mensaje);
      }
    );
  }



  edit(id: number): void {

    const objeto: proyecto = new proyecto(
      id,
      (<HTMLInputElement>document.getElementById("nameProyecto")).value,
      (<HTMLInputElement>document.getElementById("descripcionProyecto")).value,
      (<HTMLInputElement>document.getElementById("linkProyecto")).value,
      (<HTMLInputElement>document.getElementById("urlFotoProyecto")).value
    );


    this.updateProyecto(objeto);
    this.reloadComponent(true);
  }

  delete(id?: number) {
    /* console.log("Delete proyecto id:" + id) ; */
    this.deleteProyecto(id);
    this.reloadComponent(true);
  }

  wait(ms: number) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  public reloadComponent(evento: boolean) {
    this.wait(1000);
    this.ngOnInit();
  }

}
