import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { SkillsComponent } from './components/skills/skills.component';
import { HeaderComponent } from './components/header/header.component';
import { PerfilfotoComponent } from './components/perfilfoto/perfilfoto.component';
import {HttpClientModule } from '@angular/common/http';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { LoginComponent } from './components/login/login.component';
import { ButtonEditComponent } from './components/button-edit-persona/button-edit-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FormularioComponent,
    ProyectosComponent,
    SkillsComponent,
    HeaderComponent,
    PerfilfotoComponent,
    ExperienciaComponent,
    EducacionComponent,
    LoginComponent, 
    ButtonEditComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
