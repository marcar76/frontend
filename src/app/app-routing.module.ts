import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {FormularioComponent} from './components/formulario/formulario.component'
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [
   {path: '', redirectTo: '/', pathMatch: 'full'},  
  /* {path: '' , component: HeaderComponent}, */
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
