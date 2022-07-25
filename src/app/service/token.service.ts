import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenService {



  roles: Array<string> = [];

  constructor(private toastr: ToastrService) { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  wait(ms: number) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  public getToken(): string {

    const valor = sessionStorage.getItem(TOKEN_KEY);

    if (valor) {

      /* Token expiration */
   
      const decode = JSON.parse(atob(valor!.split('.')[1]));
     
      if (decode.exp * 1000 < new Date().getTime()) {

        console.log('Time Expired');
        this.logOut();
        window.location.reload();
        
      }
      /* token expiration */


      return valor;
    } else {

      return "";
    }
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {

    const valor = sessionStorage.getItem(USERNAME_KEY)
    if (valor) {
      return valor;
    }
    return "none";

  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {

      const valor = sessionStorage.getItem(AUTHORITIES_KEY);
      if (valor) {

        JSON.parse(valor).forEach((authority: { authority: string; }) => {
          this.roles.push(authority.authority);
        });

      }

    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
