import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-button-edit-persona',
  templateUrl: './button-edit-persona.component.html',
  styleUrls: ['./button-edit-persona.component.css']
})
export class ButtonEditComponent implements OnInit {
  @Input() nombrePersona!: string;
  @Input() apellidoPersona!: string;
  @Input() domicilioPersona!: string;
  @Input() fechaNacimientoPersona!: Date;
  @Input() telefonoPersona!: string;
  @Input() correoPersona!: string;
  @Input() acercaDeMiPersona!: string;
  @Input() urlFotoPersona!: string;

  @Output() newPersonaUpdateEvent = new EventEmitter<boolean>();

  constructor(private persoService: PersonaService, private router: Router) {

  }

  ngOnInit(): void {

    /* Mostrar el contenido anterior en el modal para poder editar*/
    (<HTMLInputElement>document.getElementById("nombrePasar")).value = this.nombrePersona;
    (<HTMLInputElement>document.getElementById("apellidoPasar")).value = this.apellidoPersona;
    (<HTMLInputElement>document.getElementById("domicilioPasar")).value = this.domicilioPersona;
    (<HTMLInputElement>document.getElementById("telefonoPasar")).value = this.telefonoPersona;
    (<HTMLInputElement>document.getElementById("correoPasar")).value = this.correoPersona;
    (<HTMLInputElement>document.getElementById("acercaDeMiPasar")).value = this.acercaDeMiPersona;
    (<HTMLInputElement>document.getElementById("urlFotoPasar")).value = this.urlFotoPersona;

    /* Read this.fechaNacimientoPersona and convert to Date*/

    let splitted = this.fechaNacimientoPersona.toString().split(",");
    let fecha: Date = new Date(splitted[0] + "-" + splitted[1] + "-" + splitted[2]);

    (<HTMLInputElement>document.getElementById("fechaPasar")).valueAsDate = fecha;


  }

  edit(): void {
    /* Read modified DATE and split "-" */
    let readDate = (<HTMLInputElement>document.getElementById("fechaPasar")).value.toString();
    let splitted = readDate.toString().split("-");
    const date = new Date(splitted[0] + "-" + splitted[1] + "-" + splitted[2]);

    /* console.log("`Año: " + splitted[0]);
    console.log("Mes: " + splitted[1]);
    console.log("Dia: " + splitted[2]); */

    const p: persona = new persona(1,
      (<HTMLInputElement>document.getElementById("nombrePasar")).value,
      (<HTMLInputElement>document.getElementById("apellidoPasar")).value,
      (<HTMLInputElement>document.getElementById("domicilioPasar")).value,
      date,
      (<HTMLInputElement>document.getElementById("telefonoPasar")).value,
      (<HTMLInputElement>document.getElementById("correoPasar")).value,
      (<HTMLInputElement>document.getElementById("acercaDeMiPasar")).value,
      (<HTMLInputElement>document.getElementById("urlFotoPasar")).value

    );



    this.persoService.updatePersona(p).subscribe(
      data => {
      },
      err => {
        alert(err.error.mensaje);
      }

    );

    this.newPersonaUpdateEvent.emit(false);
  }





  delete(): void {
    alert('delete option');

  }
}


