import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'Portfolio Mario';
  
}
