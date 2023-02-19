import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';
import { Login } from '../models/login';

import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL API WEB
  private endpoint = environment.baseUrl + "auth";

  /* FLAG PARA TESTES. DETERMINA SE A APLICAÇÃO DEVE UTILIZAR O TEMPO DE DURAÇÃO DO TOKEN */
  private expira = false;

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private httpClient: HttpClient) { }

  // AUTENTICAR(envia um Login e recebe um Auth)
  autenticar(login: Login) {
    return this.httpClient.post<Auth>(this.endpoint, login);
  }

  // VERIFICAR SE O USUÁRIO ESTÁ AUTENTICADO
  isUserLoggedIn() {
    const accessToken = this.getAuthorizationToken();

    if (!accessToken) {
      console.log("Nenhum usuário logado.");
      return false;

    } else if (this.isTokenExpired(accessToken)) {
      console.log("Não autorizado: Acesso expirado.");
      return false;
    }

    console.log("Autorizado.");
    return true;
  }

  // Buscando token na sessão
  getAuthorizationToken() {

    const authUser = JSON.parse(localStorage.getItem('AUTH') as any);
    if(authUser){
      const accessToken = authUser.accessToken;
      return accessToken;
    }
    return null;
  }

  // Verifica se o token expirou
  isTokenExpired(accessToken?: string): boolean {
    if (!accessToken) {
      return true;
    }

    const date = this.getTokenExpirationDate(accessToken);
    if (date === undefined) {
      return false;
    }

    if(this.expira){
      return (date.valueOf() > new Date().valueOf());
    }else{
      console.log("TOKEN NÃO EXPIRA");
      return false;
    }


  }

  // Captura a data de expiração do token
  getTokenExpirationDate(accessToken: string): Date {
    const decoded: any = jwt_decode(accessToken);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

}

