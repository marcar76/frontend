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
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { LoginComponent } from './components/auth/login.component';
import { ButtonEditComponent } from './components/button-edit-persona/button-edit-persona.component';
import { ButtonEditSkillsComponent } from './components/button-add-skills/button-add-skills.component';
 
import { FormsModule } from '@angular/forms';
import { ButtonAddProyectoComponent } from './components/button-add-proyecto/button-add-proyecto.component';

import { ButtonAddEducacionComponent } from './components/button-add-educacion/button-add-educacion.component';
 
import { FormularioEditComponent } from './components/formulario-list/formulario-list.component';
import { ButtonAddExperienciaComponent } from './components/button-add-experiencia/button-add-experiencia.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MenuComponent } from './components/menu/menu.component';
import {   ProdInterceptorService } from './components/interceptors/prod-interceptor.service';
 


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
    ButtonEditComponent, 
    ButtonEditSkillsComponent,     
    ButtonAddProyectoComponent,     
    ButtonAddEducacionComponent,
    FormularioEditComponent, 
    ButtonAddExperienciaComponent, 
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
     
  ],
  providers: [LoginComponent,{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
