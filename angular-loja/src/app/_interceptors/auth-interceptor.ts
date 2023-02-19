import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../usuarios/services/auth.service";


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  /*INETECEPTANDO REQUISIÇÕES NÃO AUTORIZADAS
  somente os endpopints "/api/auth" e "/api/usuarios" estão autorizados pela API a receber requisições http sem o token
  */

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    //BUSCANDO UM TOKEN VÁLIDO
    const accessToken = this.authService.getAuthorizationToken();

    //VARIÁVEL PARA UMA NOVA REQUISIÇÃO
    let request: HttpRequest<any> = req;

    if (accessToken) {

      if(!this.authService.isTokenExpired(accessToken)) {

        // O request é imutavel, ou seja, não é possível mudar nada.Faço o clone para conseguir mudar as propriedades
        // Passo o token de autenticação no header
        request = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        });
      }

    }

    // envia solicitação clonada com cabeçalho para o próximo manipulador.(cabeçalhos clonados, atualizados e com a autorização.)
    return next.handle(request);
  }

}

/* // retorno o request com o erro tratado
      return next.handle(request)
      .pipe(
        catchError(this.handleError)
      ); */

/*  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // Erro de client-side ou de rede
    console.error('Ocorreu um erro:', error.error.message);
  } else {
    // Erro retornando pelo backend
    console.error(
      `Código do erro ${error.status}, ` +
      `Erro: ${JSON.stringify(error.error)}`);
  }
  // retornar um observable com uma mensagem amigavel.
  return throwError('Ocorreu um erro, tente novamente');
} */


