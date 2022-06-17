import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
URL: string = environment.apiUrlBackend;
  
constructor(private http: HttpClient) { }

  public getPersona():Observable<persona> {
    console.log("URL: " + this.URL);
      return this.http.get<persona>(this.URL + 'find/persona/1');
  }

  public updatePersona(persona: persona):Observable<persona>{
    return this.http.put<persona>(this.URL + 'save/persona',persona);
  }
}

  






