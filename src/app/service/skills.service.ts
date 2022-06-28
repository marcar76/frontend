import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {skills } from '../model/skills.model';


@Injectable({
  providedIn: 'root'
})
export class skillsService {
  URL: string = environment.apiUrlBackend;
  
  constructor(private http: HttpClient) { }

  public getSkill():Observable<skills[]> {
    
      return this.http.get<skills[]>(this.URL + 'list/conocimiento');
  }

  public updateSkill(  skill: skills):Observable<skills>{
    return this.http.put<skills>(this.URL + 'save/conocimiento/',skill);
  }
  
  public borrarSkill(id?: number ):Observable<any>{
    return this.http.delete<any>(this.URL + 'delete/conocimiento/' + id);
  }
  public createSkill(skill: skills):Observable<skills>{
    return this.http.post<skills>(this.URL + 'new/conocimiento',skill);
  }
  



}
