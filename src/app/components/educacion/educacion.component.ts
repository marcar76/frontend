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

  url!: string;

  urlfoto!: string;
  tempAddEducacion!: educacion;

  isLogged = false;
  roles!: string[];
  isAdmin = false;

  constructor(private educacionService: educacionService, private tokenService: TokenService, private toastr: ToastrService) { }

  public date: Date = new Date();

  ngOnInit(): void {

    this.tempEducacion = new educacion(0, "", "", "", "", "", "");
    this.tempAddEducacion = new educacion(0, "", "", "", "", "", "");

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
        this.toastr.error(error.message, 'Error: ', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    })
  }

  public updateEducacion(educacion: educacion): void {
    this.educacionService.updateEducacion(educacion).subscribe(response => {
      response = this.educacion;
      this.toastr.success('Educacion actualizada', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    },
      err => {
        this.toastr.error('No pudo actualizar educacion', 'Error: ', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      });
  }



  public deleteEducacion(id?: number) {
    this.educacionService.borrarEducacion(id).subscribe(data => {
      this.toastr.info('Educacion borrada', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    },
      err => {
        this.toastr.error('No pudo eliminar educacion', 'Error: ', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );

  }
  edit(id: number): void { 
    if (this.tempEducacion.url) {
      this.url = this.tempEducacion.url;
    }
    else {
      this.url = "https://drive.google.com/uc?export=view&id=1chCER2JdSjPDBp_setpoJscXrJ2KLQFF";
    }
    const objeto: educacion = new educacion(this.tempEducacion.id!, this.tempEducacion.nombreeducacion!, this.tempEducacion.fechainicio!, this.tempEducacion.fechafin!, this.tempEducacion.descripcion!, this.url!, this.tempEducacion.link!);

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




  public addEducacion() { 

    if (this.tempAddEducacion.url) {
      this.url = this.tempAddEducacion.url;
    }
    else {
      this.url = "https://drive.google.com/uc?export=view&id=1chCER2JdSjPDBp_setpoJscXrJ2KLQFF";
    }
    const objetoAdd: educacion = new educacion(this.tempEducacion.id!, this.tempEducacion.nombreeducacion!, this.tempEducacion.fechainicio!, this.tempEducacion.fechafin!, this.tempEducacion.descripcion!, this.url!, this.tempEducacion.link!);


    this.newEducacion(objetoAdd);
    //Clear form modal
    this.tempEducacion.nombreeducacion = "";
    this.tempEducacion.fechainicio = "";
    this.tempEducacion.fechafin = "";
    this.tempEducacion.descripcion = "";
    this.url = "";
    this.tempEducacion.link = "";

    this.reloadComponent(true);
      
  }

  public newEducacion(educacion: educacion): void {
    this.educacionService.createEducacion(educacion).subscribe(
      data => {
        this.toastr.success('Educacion agregada.', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      },
      err => {
        this.toastr.error("No se pudo agregar Educacion", 'Error:', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

}
