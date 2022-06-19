import { Component, Input, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
 

@Component({
  selector: 'app-button-edit-persona',
  templateUrl: './button-edit-persona.component.html',
  styleUrls: ['./button-edit-persona.component.css']
})
export class ButtonEditComponent implements OnInit {
@Input() nombrePersona!:string;
@Input() apellidoPersona!:string;
@Input() domicilioPersona!:string;
@Input() fechaNacimientoPersona!:Date;
@Input() telefonoPersona!:string;
@Input() correoPersona!:string;
@Input() acercaDeMiPersona!:string;
@Input() urlFotoPersona!:string;

 

  constructor(private persoService: PersonaService) { 
    
  }

  ngOnInit(): void {
    
  /* Mostrar el contenido anterior en el modal para poder editar*/
  (<HTMLInputElement>document.getElementById("nombrePasar")).value = this.nombrePersona;  
  (<HTMLInputElement>document.getElementById("apellidoPasar")).value = this.apellidoPersona;
  (<HTMLInputElement>document.getElementById("domicilioPasar")).value = this.domicilioPersona;
 /*(<HTMLInputElement>document.getElementById("fechaPasar")).value = this.fechaNacimientoPersona.getDate;  */
  
  (<HTMLInputElement>document.getElementById("telefonoPasar")).value = this.telefonoPersona;
  (<HTMLInputElement>document.getElementById("correoPasar")).value = this.correoPersona;
  (<HTMLInputElement>document.getElementById("acercaDeMiPasar")).value = this.acercaDeMiPersona;
  (<HTMLInputElement>document.getElementById("urlFotoPasar")).value = this.urlFotoPersona;
  
  /* console.log("Año: " + this.fechaNacimientoPersona.getFullYear.toString);
  console.log("Mes:" + this.fechaNacimientoPersona.getMonth);
  console.log("Dia:" + this.fechaNacimientoPersona.getDay);
    
  
  const anio = this.fechaNacimientoPersona.getFullYear.toString;
  (<HTMLInputElement>document.getElementById("fechaPasar")).value = this.fechaNacimientoPersona.getDay.toString;  */
  }
  
    edit():void{
     /* const nombre = document.getElementById('nombrePasar') as HTMLInputElement;

    console.log("nombre: " + nombre.value); */
    const date = new Date('12-5-1973');
    const p: persona = new persona(1,
      (<HTMLInputElement>document.getElementById("nombrePasar")).value,
      (<HTMLInputElement>document.getElementById("apellidoPasar")).value,
      (<HTMLInputElement>document.getElementById("domicilioPasar")).value,date,
      
      
      (<HTMLInputElement>document.getElementById("telefonoPasar")).value,
      (<HTMLInputElement>document.getElementById("correoPasar")).value,
      (<HTMLInputElement>document.getElementById("acercaDeMiPasar")).value,
      (<HTMLInputElement>document.getElementById("urlFotoPasar")).value
     
      ); 

   this.persoService.updatePersona(p).subscribe(
    data => {alert(data)
  },
  err => {
    alert(err.error.mensaje);
  }    
   
   );
  }
   delete():void {
     alert('delete option');
    
  }
}
 

