import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../model/login-usuario';
import { JwtDTO } from '../model/jwt-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
  authURL = environment.apiUrlBackend + 'auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }
}
