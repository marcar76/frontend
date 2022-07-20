import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenService {



  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    console.log("Toke;: " + sessionStorage.getItem(TOKEN_KEY));
    const valor = sessionStorage.getItem(TOKEN_KEY);
    if (valor) {
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
