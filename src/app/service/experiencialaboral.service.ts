 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {experienciaLaboral } from '../model/experiencialaboral.model';


@Injectable({
  providedIn: 'root'
})
export class ExperiencialaboralService {
  URL: string = environment.apiUrlBackend;
  
  constructor(private http: HttpClient) { }

  public getExperienciaLaboral():Observable<experienciaLaboral[]> {
    
      return this.http.get<experienciaLaboral[]>(this.URL + 'list/experienciaLaboral');
  }

  public updateExperienciaLaboral(  experienciaLaboral: experienciaLaboral):Observable<experienciaLaboral>{
    return this.http.put<experienciaLaboral>(this.URL + 'save/educacion/',experienciaLaboral);
  }
  
  public borrarExperienciaLaboral(id?: number ):Observable<any>{
    return this.http.delete<any>(this.URL + 'delete/experienciaLaboral/' + id);
  }
  public createExperienciaLaboral(experienciaLaboral: experienciaLaboral):Observable<experienciaLaboral>{
    return this.http.post<experienciaLaboral>(this.URL + 'new/experienciaLaboral',experienciaLaboral);
  }
  



}
