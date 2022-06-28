import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {educacion } from '../model/educacion.model';


@Injectable({
  providedIn: 'root'
})
export class educacionService {
  URL: string = environment.apiUrlBackend;
  
  constructor(private http: HttpClient) { }

  public getEducacion():Observable<educacion[]> {
    
      return this.http.get<educacion[]>(this.URL + 'list/educacion');
  }

  public updateEducacion(  educacion: educacion):Observable<educacion>{
    return this.http.put<educacion>(this.URL + 'save/educacion/',educacion);
  }
  
  public borrarEducacion(id?: number ):Observable<any>{
    return this.http.delete<any>(this.URL + 'delete/educacion/' + id);
  }
  public createEducacion(educacion: educacion):Observable<educacion>{
    return this.http.post<educacion>(this.URL + 'new/educacion',educacion);
  }
  



}
