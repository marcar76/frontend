import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formulario } from 'src/app/model/formulario.model';
import { LoginComponent } from '../auth/login.component';
import { formularioService } from '../../service/formulario.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  formulario!: formulario;
  tempFormulario!: formulario;
  mostrar: boolean = false;

  isLogged = false;
  roles!: string[];
  isAdmin = false;

  constructor(private formularioServ: formularioService, private toastr: ToastrService, private tokenService: TokenService) { }

  ngOnInit() {
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
  }

  addFormulario() {
    const objeto: formulario = new formulario(0, this.tempFormulario.nombre!, this.tempFormulario.correo!, this.tempFormulario.asunto!, this.tempFormulario.mensaje!, "");
    this.newFormulario(objeto);
    this.tempFormulario.nombre = "";
    this.tempFormulario.correo = "";
    this.tempFormulario.asunto = "";
    this.tempFormulario.mensaje = "";

   

  }
  public newFormulario(formulario: formulario): void {
    this.formularioServ.createFormulario(formulario).subscribe(
      data => {

        this.toastr.success('Formulario enviado', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

      },
      err => {

        this.toastr.error('Error al enviar formulario', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    );
  }
}
