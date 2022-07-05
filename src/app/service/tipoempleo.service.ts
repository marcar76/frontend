import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {tipoempleo } from '../model/tipoempleo.model';


@Injectable({
  providedIn: 'root'
})
export class TipoempleoService {
  URL: string = environment.apiUrlBackend;
  
  constructor(private http: HttpClient) { }

  public getEmpleo():Observable<tipoempleo[]> {
    
      return this.http.get<tipoempleo[]>(this.URL + 'list/tipoempleo');
  }

  public updateEmpleo(  tipoempleo: tipoempleo):Observable<tipoempleo>{
    return this.http.put<tipoempleo>(this.URL + 'save/tipoempleoo/',tipoempleo);
  }
  
  public borrarEmpleo(id?: number ):Observable<any>{
    return this.http.delete<any>(this.URL + 'delete/tipoempleo/' + id);
  }
  public createEmpleo(tipoempleo: tipoempleo):Observable<tipoempleo>{
    return this.http.post<tipoempleo>(this.URL + 'new/tipoempleo',tipoempleo);
  }
  



}
