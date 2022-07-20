import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../auth/login.component';
import { formulario } from 'src/app/model/formulario.model';
import { formularioService } from 'src/app/service/formulario.service';

import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-formulario-list',
  templateUrl: './formulario-list.component.html',
  styleUrls: ['./formulario-list.component.css']
})
export class FormularioEditComponent implements OnInit {

  public formularioList: formulario[] = [];
  mostrar: boolean = false;
  formulario!: formulario;
  tempFormulario!: formulario;
  isLogged = false;
  roles!: string[];
  isAdmin = false;


  constructor(private login: LoginComponent, private formularioService: formularioService, private tokenService: TokenService,private toastr: ToastrService) { }


  ngOnInit(): void {
    this.tempFormulario = new formulario(0, "", "", "", "", "");
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
    this.getFormulario();
  }



  public getFormulario(): void {
    this.formularioService.getFormulario().subscribe({
      next: (response: formulario[]) => {
        this.formularioList = response;

      },
      /*   error: (error: HttpErrorResponse) => {
          alert("Horror" + error.message);
        } */
    })
  }

  public updateFormulario(formulario: formulario): void {
    this.formularioService.updateFormulario(formulario).subscribe(response => { 
      response = this.formulario; 
      this.toastr.success('Mensaje actualizado' , '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      
      this.ngOnInit(); });

  }



  public deleteFormulario(id?: number) {
    this.formularioService.borrarFormulario(id).subscribe(data => {
      this.toastr.success('Mensaje eliminado' , '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.ngOnInit();
    },
      err => {
        alert(err.error.mensaje);
      }

    );

  }




  edit(id: number): void {
     


    const objeto: formulario = new formulario(id,
      (<HTMLInputElement>document.getElementById("nameFormulario")).value,
      (<HTMLInputElement>document.getElementById("correoFormulario")).value,
      (<HTMLInputElement>document.getElementById("asuntoFormulario")).value,
      (<HTMLInputElement>document.getElementById("mensajeFormulario")).value,
      (<HTMLInputElement>document.getElementById("notasFormulario")).value
    );

     

    this.updateFormulario(objeto);

  }

  delete(id?: number) {
    this.deleteFormulario(id);

  }





}
