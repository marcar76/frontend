import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
URL = environment.apiUrlBackend;
  
constructor(private http: HttpClient) { }

  public getPersona():Observable<persona> {
    console.log("URL: " + this.URL);
      return this.http.get<persona>(this.URL + 'find/persona/1');

  }

  public updatePersona(persona: persona):Observable<persona>{
    return this.http.put<persona>(this.URL + 'save/persona',persona);
  }
}


  // @PostMapping("/new/persona")
  //   public void agregarPersona(@RequestBody Persona pers) {
  //       persoServ.crearPersona(pers);
  //   }
    
  //   @GetMapping("/list/personas")
  //   @ResponseBody
  //   public List<Persona> verPersonas() {
  //       return persoServ.verPersonas();
  //   }
    

  //   @GetMapping("/find/persona/{id}")
  //   public void buscarPersona(@PathVariable Long id) {
  //       persoServ.buscarPersona(id);
  //   }


  //   @DeleteMapping("/delete/persona/{id}")
  //   public void borrarPersona(@PathVariable Long id) {
  //       persoServ.borrarPersona(id);
  //   }
    
  //   @PutMapping ("/save/persona")
  //   public void editarPersona(@RequestBody Persona pers){
  //       persoServ.editarPersona(pers);
  //   }
    







