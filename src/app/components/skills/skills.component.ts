import { Component, OnInit } from '@angular/core';
import { skills } from 'src/app/model/skills.model';
import { skillsService } from 'src/app/service/skills.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
skills!: skills;
  
  loginok!: boolean;

  constructor(private skillService: skillsService, private login: LoginComponent )  { }

  ngOnInit(): void {
this.getSkills;
    this.loginok= this.getLogin();
  }

  public getSkills():void{  
    this.skillService.getSkill().subscribe( response  => {this.skills=response});       
   
  }
  
  public updateSkill(id: number, skill: skills):void{  
    this.skillService.updateSkill(id, skill).subscribe( response  => {response=this.skills});      
  } 
   
  public getLogin(){
    return this.login.loginok();
  }




 /*  public getSkill():Observable<skills> {
    
    return this.http.get<skills>(this.URL + 'list/conocimiento');
}

public updateSkill(id: number, skill: skills):Observable<skills>{
  return this.http.put<skills>(this.URL + 'save/conocimiento/' + id,skill);
}

public borrarSkills(id: number ):Observable<any>{
  return this.http.delete<any>(this.URL + 'delete/conocimiento/' + id);
}
public createSkill(skill: skills):Observable<skills>{
  return this.http.post<skills>(this.URL + 'new/conocimiento',skill);
}

 */

}
