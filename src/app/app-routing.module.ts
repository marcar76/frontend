import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { FormularioComponent } from './components/formulario/formulario.component'
import { HeaderComponent } from './components/header/header.component';
import { PerfilfotoComponent } from './components/perfilfoto/perfilfoto.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProdGuardService as guard } from './components/guards/prod-guard.service';

const routes: Routes = [

  { path: '', component: HeaderComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '/', pathMatch: 'full' }

];

/* , canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },

 { path: 'perfil', component: PerfilfotoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'conocimiento', component: SkillsComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'educacion', component: EducacionComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'proyectos', component: ProyectosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'experiencia', component: ExperienciaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'contacto', component: FormularioComponent },


  { path: 'perfil', component: PerfilfotoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'proyectos', component: ProyectosComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },




*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
