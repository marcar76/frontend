import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { proyecto } from '../model/proyecto.model';


@Injectable({
  providedIn: 'root'
})
export class proyectoService {
  URL: string = environment.apiUrlBackend;

  constructor(private http: HttpClient) { }

  public getProyectos(): Observable<proyecto[]> {

    return this.http.get<proyecto[]>(this.URL + 'list/proyecto');
  }

  public updateProyecto(proyecto: proyecto): Observable<proyecto> {
    return this.http.put<proyecto>(this.URL + 'save/proyecto/', proyecto);
  }

  public borrarProyecto(id?: number): Observable<any> {
    return this.http.delete<any>(this.URL + 'delete/proyecto/' + id);
  }
  public createProyecto(proyecto: proyecto): Observable<proyecto> {
    return this.http.post<proyecto>(this.URL + 'new/proyecto', proyecto);
  }




}
