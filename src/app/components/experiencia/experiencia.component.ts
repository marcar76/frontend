import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { experienciaLaboral } from 'src/app/model/experiencialaboral.model';
import { ExperiencialaboralService } from 'src/app/service/experiencialaboral.service';
import { LoginComponent } from '../auth/login.component';
import { TipoempleoService } from 'src/app/service/tipoempleo.service';
import { tipoempleo } from 'src/app/model/tipoempleo.model';
import { TokenService } from 'src/app/service/token.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experienciaLaboralList: experienciaLaboral[] = [];

  experienciaLaboral!: experienciaLaboral;
  tempExperienciaLaboral!: experienciaLaboral;
  tempAddExperiencia!: experienciaLaboral;

  tempTipoEmpleo!: tipoempleo;
  tipoid!: number | undefined;
  tiponame!: string | undefined;
  mostrartipoempleo!: string | undefined;
  checkervalue!: boolean;
  tipoNuevo!: string | undefined;;


  public tipoEmpleoList: tipoempleo[] = [];

  public objeto!: experienciaLaboral;

  public tipoemepleo!: tipoempleo | undefined;

  tempObjetoExperiencia!: experienciaLaboral;

  urlfoto: string = "https://drive.google.com/uc?export=view&id=1chCER2JdSjPDBp_setpoJscXrJ2KLQFF";

  isLogged = false;
  roles!: string[];
  isAdmin = false;

  tipoElegido!: string;
  

  constructor(private tipoempleoService: TipoempleoService, private experienciaService: ExperiencialaboralService,
    private tokenService: TokenService, private toastr: ToastrService) { }

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

    this.tempTipoEmpleo = new tipoempleo(0, "");
    this.tempExperienciaLaboral = new experienciaLaboral(0, "", true, 0, 0, "", "", "", this.tempTipoEmpleo);
    this.tempAddExperiencia = new experienciaLaboral(0, "", true, 0, 0, "", "", "", this.tempTipoEmpleo);

    this.getExperienciaLaboral();

    this.tipoemepleo = new tipoempleo(0, "");

    this.tempObjetoExperiencia = new experienciaLaboral(0, "", true, 0, 0, "", "", "", this.tipoemepleo);
    this.mostrartipoempleo = "";

    this.getTipoEmpleo();


  }

  valor(id?: number, nombre?: string) {
    this.tipoid = id;
    this.tiponame = nombre;
    this.mostrartipoempleo = nombre;

  }

  public getExperienciaLaboral(): void {
    this.experienciaService.getExperienciaLaboral().subscribe({
      next: (response: experienciaLaboral[]) => {
        this.experienciaLaboralList = response;

      },
      error: (error: HttpErrorResponse) => {
        /* alert("Error" + error.message); */

      }
    })
  }

  public updateExperienciaLaboral(experienciaLaboral: experienciaLaboral): void {
    this.experienciaService.updateExperienciaLaboral(experienciaLaboral).subscribe(response => {
      response = this.experienciaLaboral;
      this.toastr.success('Experiencia actualizado', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }, err => {
      this.toastr.error('Error al actualizar experiencia', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    });
  }



  public deleteExperienciaLaboral(id?: number) {
    this.experienciaService.borrarExperienciaLaboral(id).subscribe(data => {
      this.toastr.success('Experiencia borrada', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }, err => {
      this.toastr.error('Error al borrar experiencia', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    });

  }


  saveChanges(id: number): void {

    const tipoAnterior = (<HTMLInputElement>document.getElementById("tipoAnterior")).textContent?.replace("Actual:", "").replace(" ", "");
    const tipoNuevo1 = (<HTMLInputElement>document.getElementById("tipoNuevo")).textContent?.replace("Nuevo:", "").replace(" ", "");

    if (tipoAnterior === tipoNuevo1) {
      this.tiponame = tipoAnterior;

    }
    else {
      this.tiponame = tipoAnterior;
    }

    if (this.tipoid === null || this.tipoid === undefined) {
      this.tipoid = parseInt((<HTMLInputElement>document.getElementById("tipoAnteriorId")).textContent?.replace("ActualId:", "").replace(" ", "")!);
    }

    const objetoEmpleo: tipoempleo = new tipoempleo(this.tipoid!, this.tiponame!);


    let checker = (<HTMLInputElement>document.getElementById("myCheckBox")).checked;

    const objeto: experienciaLaboral = new experienciaLaboral(id,
      (<HTMLInputElement>document.getElementById("nameExperiencia")).value,
      checker,
      parseInt((<HTMLInputElement>document.getElementById("inicioExperiencia")).value),
      parseInt((<HTMLInputElement>document.getElementById("finExperiencia")).value),
      (<HTMLInputElement>document.getElementById("descripcionExperiencia")).value,
      (<HTMLInputElement>document.getElementById("urlExperiencia")).value,
      (<HTMLInputElement>document.getElementById("linkPageExperiencia")).value,
      objetoEmpleo

    );


    this.updateExperienciaLaboral(objeto);
    this.reloadComponent(true);


  }

  delete(id?: number) {
    this.deleteExperienciaLaboral(id);
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



  public addExperiencia() {


    if ((<HTMLInputElement>document.getElementById("addUrlExperiencia")).value) {
      this.urlfoto = (<HTMLInputElement>document.getElementById("addUrlExperiencia")).value;
    }
    else {
      this.urlfoto = "https://drive.google.com/uc?export=view&id=1chCER2JdSjPDBp_setpoJscXrJ2KLQFF";
    }

    const objetoEmpleo: tipoempleo = new tipoempleo(this.tipoid!, this.tiponame!);

    const checker = (<HTMLInputElement>document.getElementById("myCheck")).checked

    const objeto: experienciaLaboral = new experienciaLaboral(0,
      (<HTMLInputElement>document.getElementById("addNameExperiencia")).value,
      checker,
      parseInt((<HTMLInputElement>document.getElementById("addfechaInicioExperiencia")).value),
      parseInt((<HTMLInputElement>document.getElementById("addfechaFinExperiencia")).value),
      (<HTMLInputElement>document.getElementById("addDescripcionExperiencia")).value,
      this.urlfoto,
      (<HTMLInputElement>document.getElementById("addLinkExperiencia")).value,
      objetoEmpleo

    );

    this.newExperiencia(objeto);

    /*   Clear Form modal */
    (<HTMLInputElement>document.getElementById("addNameExperiencia")).value = "";
    (<HTMLInputElement>document.getElementById("addfechaInicioExperiencia")).value = "";
    (<HTMLInputElement>document.getElementById("addfechaFinExperiencia")).value = "";
    (<HTMLInputElement>document.getElementById("addDescripcionExperiencia")).value = "";
    (<HTMLInputElement>document.getElementById("addUrlExperiencia")).value = "";
    (<HTMLInputElement>document.getElementById("addLinkExperiencia")).value = "";
    (<HTMLInputElement>document.getElementById("addtipoempleoExperiencia")).value = "";

    /* Clean TipoeEmpleo modal */
    (<HTMLInputElement>document.getElementById("addtipoempleoExperiencia")).value = "";

    this.reloadComponent(true);

  }

  public newExperiencia(experienciaLaboral: experienciaLaboral): void {
    this.experienciaService.createExperienciaLaboral(experienciaLaboral).subscribe(data => {

      this.toastr.success('Experiencia agragada', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }, err => {
      this.toastr.error('Error al agregar experiencia', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    });
  }



  /* T I P O   D E   E M P L E O */

  public getTipoEmpleo(): void {
    this.tipoempleoService.getEmpleo().subscribe({
      next: (response: tipoempleo[]) => {
        this.tipoEmpleoList = response;
      },
      error: (error: HttpErrorResponse) => {
        /*  alert("Error" + error.message); */
      }
    })
  }

  cancelar() {
    this.tipoid = 0;
    this.mostrartipoempleo = '';
  }



  addTipoEmpleo() {

    if ((<HTMLInputElement>document.getElementById("addNameTipoEmpleo")).value) {
      const objeto: tipoempleo = new tipoempleo(0, (<HTMLInputElement>document.getElementById("addNameTipoEmpleo")).value);
      this.newTipoEmpleo(objeto);
      const objetoExperiencia: experienciaLaboral = new experienciaLaboral(0, "", true, 0, 0, "", "", "", objeto);
      /* Clear form */
      (<HTMLInputElement>document.getElementById("addNameTipoEmpleo")).value = "";
    } else {
      this.toastr.warning('Tipo Empleo no puede ser nulo', 'Advertencia', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
  }

  addTipoEmpleoCarousel() {

    if ((<HTMLInputElement>document.getElementById("addNameTipoEmpleoCarousel")).value) {
      const objeto: tipoempleo = new tipoempleo(0, (<HTMLInputElement>document.getElementById("addNameTipoEmpleoCarousel")).value);
      this.newTipoEmpleo(objeto);
      const objetoExperiencia: experienciaLaboral = new experienciaLaboral(0, "", true, 0, 0, "", "", "", objeto);
      /* Clear form */
      (<HTMLInputElement>document.getElementById("addNameTipoEmpleoCarousel")).value = "";
    } else {
      this.toastr.warning('Tipo Empleo no puede ser nulo', 'Advertencia', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
  }



  public newTipoEmpleo(tipoempleo: tipoempleo): void {
    this.tipoempleoService.createEmpleo(tipoempleo).subscribe(data => {
      this.ngOnInit();
      this.toastr.success('Tipo Empleo agregado', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }, err => {
      this.toastr.error('Al agregar Tipo Empleo', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    });
  }

  public deleteTipoEmpleo(id: number): void {
    this.tipoempleoService.borrarEmpleo(id).subscribe(data => {
      this.tipoid = 0;
      this.ngOnInit();
      this.toastr.success('Tipo Empleo borrado', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }, err => {
      this.toastr.error('Tipo Empleo en uso', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    });
  }
  deletetipo(id: number) {
    this.deleteTipoEmpleo(id);
  }



}
