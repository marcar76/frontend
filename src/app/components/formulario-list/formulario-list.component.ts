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


  constructor(private login: LoginComponent, private formularioService: formularioService, private tokenService: TokenService, private toastr: ToastrService) { }


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

    })
  }

  public updateFormulario(formulario: formulario): void {
    this.formularioService.updateFormulario(formulario).subscribe(response => {
      response = this.formulario;
      this.ngOnInit();
      this.toastr.success('Mensaje actualizado', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }, err => {
      this.toastr.error('al actualizar mensaje', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    });

  }



  public deleteFormulario(id?: number) {
    this.formularioService.borrarFormulario(id).subscribe(data => {
      this.toastr.success('Mensaje eliminado', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.ngOnInit();
    }, err => {
      this.toastr.error('al eliminar mensaje', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    });

  }

  edit(id: number): void {
    const objeto: formulario = new formulario(id,
      this.tempFormulario.nombre!,
      this.tempFormulario.correo!,
      this.tempFormulario.asunto!,
      this.tempFormulario.mensaje!,
      this.tempFormulario.notas!
    );


    this.updateFormulario(objeto);

  }

  delete(id?: number) {
    this.deleteFormulario(id);

  }

}
