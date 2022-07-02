import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { formulario } from '../model/formulario.model';

@Injectable({
  providedIn: 'root'
})
export class formularioService {

  URL: string = environment.apiUrlBackend;
  
  constructor(private http: HttpClient) { }

  public getFormulario():Observable<formulario[]> {
    
      return this.http.get<formulario[]>(this.URL + 'list/formulario');
  }

  public updateFormulario(  formulario: formulario):Observable<formulario>{
    return this.http.put<formulario>(this.URL + 'save/formulario/',formulario);
  }
  
  public borrarFormulario(id?: number ):Observable<any>{
    return this.http.delete<any>(this.URL + 'delete/formulario/' + id);
  }
  public createFormulario(formulario: formulario):Observable<formulario>{
    return this.http.post<formulario>(this.URL + 'new/formulario',formulario); 
    
  }
  
}
