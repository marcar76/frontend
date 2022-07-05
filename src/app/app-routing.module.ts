import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import {FormularioComponent} from './components/formulario/formulario.component'
import { HeaderComponent } from './components/header/header.component';
import {PerfilfotoComponent} from './components/perfilfoto/perfilfoto.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { SkillsComponent } from './components/skills/skills.component';

const routes: Routes = [
    
  {path: '', component: PerfilfotoComponent, pathMatch: 'full'},
  {path: 'conocimiento', component: SkillsComponent},
  {path: 'educacion', component: EducacionComponent},
  {path: 'proyectos', component: ProyectosComponent},
  {path: 'experiencia', component: ExperienciaComponent },
  {path: 'contacto', component: FormularioComponent},
   

  {path: '**', redirectTo: '/', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
