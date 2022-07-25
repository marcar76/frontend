import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  fotoPersona!: string;
  persona!: persona

  constructor(private persoService: PersonaService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit(): void {
  
    /* Read this.fechaNacimientoPersona and convert to Date*/
    let splitted = this.fechaNacimientoPersona.toString().split("-");
    let fecha: Date = new Date(splitted[0] + "-" + splitted[1] + "-" + splitted[2]);
    (<HTMLInputElement>document.getElementById("fechaPasar")).valueAsDate = fecha;

  }

  edit(): void {
    /* Read modified DATE and split "-" */
    let readDate = (<HTMLInputElement>document.getElementById("fechaPasar")).value.toString();
    let splitted = readDate.toString().split("-");
    const date = new Date(splitted[0] + "-" + splitted[1] + "-" + splitted[2]);
  
    if (this.urlFotoPersona) {
      this.fotoPersona = this.urlFotoPersona;
    } else {
      this.fotoPersona = "https://drive.google.com/uc?export=view&id=1chCER2JdSjPDBp_setpoJscXrJ2KLQFF";
    }

    const p: persona = new persona(1, 
      this.nombrePersona, 
      this.apellidoPersona, 
      this.domicilioPersona, 
      date, 
      this.telefonoPersona, 
      this.correoPersona, 
      this.acercaDeMiPersona,
      this.fotoPersona);
      
    this.updatePersona(p);    
    this.newPersonaUpdateEvent.emit(false);
  }

  public updatePersona(p: persona): void {
    this.persoService.updatePersona(p).subscribe(response => {
      response = this.persona;
      this.toastr.success('Datos actualizados', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }, err => {
      this.toastr.error('Error al actualizar datos', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    });
  }
  public deletePersona(p: persona): void {
    this.persoService.updatePersona(p).subscribe(response => {
      response = this.persona;
      this.toastr.success('Datos borrados', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }, err => {
      this.toastr.error('Error al borrar datos', '', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

    });
  } 


  delete(): void {
    const date = new Date("1900-01-01");
    this.fotoPersona = "https://drive.google.com/uc?export=view&id=1chCER2JdSjPDBp_setpoJscXrJ2KLQFF";

    const p: persona = new persona(1, 
      "", 
      "", 
      "", 
      date, 
      "", 
      "", 
      "", 
      this.fotoPersona);    
    this.deletePersona(p);
    this.newPersonaUpdateEvent.emit(false);
  }
}


