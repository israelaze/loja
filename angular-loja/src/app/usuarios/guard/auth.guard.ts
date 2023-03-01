import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  // um guarda que decide se uma rota pode ser ativada
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const accessToken = this.authService.getAuthorizationToken();

    // verificando se existe um usuário autenticado
    if (this.authService.isUserLoggedIn()) {
      return true;

    }

    // verificando se existe um token, porém expirado
    if(accessToken != null && this.authService.isTokenExpired){

      alert("Acesso expirado. Necessário refazer o login para continuar.");
      this.router.navigate(['login']);

      return false;

    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
