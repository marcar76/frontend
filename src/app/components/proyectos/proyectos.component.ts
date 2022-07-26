import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { proyecto } from 'src/app/model/proyecto.model';
import { proyectoService } from 'src/app/service/proyecto.service';
 
import { HttpErrorResponse } from '@angular/common/http';
 
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

  public objeto!: proyecto;
  proyecto!: proyecto;
  tempProyecto!: proyecto;
  urlfoto!: string;
  tempAddProyecto!: proyecto;

  isLogged = false;
  roles!: string[];
  isAdmin = false;

  constructor(private proyectoService: proyectoService, private tokenService: TokenService,  
     private toastr: ToastrService,) { }

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
    this.tempAddProyecto = new proyecto(0, "", "", "", "");

    this.getProyecto();

  }

  public getProyecto(): void {
    this.proyectoService.getProyectos().subscribe({
      next: (response: proyecto[]) => {
        this.proyectoList = response;

      },
      error: (error: HttpErrorResponse) => {
        /* alert("Error" + error.message);  */ 

      }
    })
  }

  public updateProyecto(proyecto: proyecto): void {
    this.proyectoService.updateProyecto(proyecto).subscribe(response => {
      response = this.proyecto;
      this.toastr.success('Proyecto actualizado', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    }, err => {
      this.toastr.error('Error al actualizar proyecto', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    });
  }



  public deleteProyecto(id?: number) {
    this.proyectoService.borrarProyecto(id).subscribe(data => {
      this.toastr.success('Proyecto borrado', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    },
      err => {
        this.toastr.error('Error al borrar proyecto', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

      }
    );
  }



  edit(id: number): void {

    if (this.tempProyecto.urlfoto) {
      this.urlfoto = this.tempProyecto.urlfoto;
    }
    else {
      this.urlfoto = "https://drive.google.com/uc?export=view&id=1chCER2JdSjPDBp_setpoJscXrJ2KLQFF";
    }
    const objeto: proyecto = new proyecto(this.tempProyecto.id!, this.tempProyecto.nombreproyecto!, this.tempProyecto.descripcion!,this.tempProyecto.link!, this.urlfoto!);
  
    this.updateProyecto(objeto);
    this.reloadComponent(true);


  }

  delete(id?: number) {

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






  public addProyecto() {


    if (this.tempAddProyecto.urlfoto) {
      this.urlfoto = this.tempAddProyecto.urlfoto;
    }
    else {
      this.urlfoto = "https://drive.google.com/uc?export=view&id=1chCER2JdSjPDBp_setpoJscXrJ2KLQFF";
    }
    const objetoAdd: proyecto = new proyecto(this.tempAddProyecto.id!, this.tempAddProyecto.nombreproyecto!, this.tempAddProyecto.descripcion!, this.tempAddProyecto.link!, this.urlfoto);

    this.newProyecto(objetoAdd);
    //Clear form modal
    this.tempAddProyecto.nombreproyecto = "";
    this.tempAddProyecto.descripcion = "";
    this.tempAddProyecto.link = "";
    this.tempAddProyecto.urlfoto = "";
    this.reloadComponent(true);
   
  }

  public newProyecto(proyecto: proyecto): void {
    this.proyectoService.createProyecto(proyecto).subscribe(
      data => {
        this.toastr.success('Proyecto agregado', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

      },
      err => {
        this.toastr.error('Error al agregar Proyecto', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }

}
