import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { educacion } from 'src/app/model/educacion.model';
import { educacionService } from 'src/app/service/educacion.service';

import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educacionList: educacion[] = [];
  educacion!: educacion;
  tempEducacion!: educacion;

  isLogged = false;
  roles!: string[];
  isAdmin = false;

  constructor(private educacionService: educacionService, private tokenService: TokenService, private toastr: ToastrService) { }

  public date: Date = new Date();

  ngOnInit(): void {

    this.tempEducacion = new educacion(0, "", "", "", "", "", "");

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
    this.getEducacion(); 
  }


  public getEducacion(): void {
    this.educacionService.getEducacion().subscribe({
      next: (response: educacion[]) => {
        this.educacionList = response;
        

      },
       error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message , 'Error: ', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
       } 
    })
  }

  public updateEducacion(educacion: educacion): void {
    this.educacionService.updateEducacion(educacion).subscribe(response => { response = this.educacion;
      this.toastr.success('Educacion actualizada' , '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    });
  }



  public deleteEducacion(id?: number) {
    this.educacionService.borrarEducacion(id).subscribe(data => {
      this.toastr.info('Educacion borrada' , '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    },
       err => {
        this.toastr.error('No pudo eliminar educacion' , 'Error: ', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      } 
    );

  } 
  edit(id: number): void {

    const objeto: educacion = new educacion(id,
      (<HTMLInputElement>document.getElementById("nameEducacion")).value,
      (<HTMLInputElement>document.getElementById("inicioEducacion")).value,
      (<HTMLInputElement>document.getElementById("finEducacion")).value,
      (<HTMLInputElement>document.getElementById("descripcionEducacion")).value,
      (<HTMLInputElement>document.getElementById("urlFotoEducacion")).value,
      (<HTMLInputElement>document.getElementById("linkPageEducacion")).value

    ); 
    this.updateEducacion(objeto);
    this.reloadComponent(true);
  }

  delete(id?: number) {
    this.deleteEducacion(id);
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
