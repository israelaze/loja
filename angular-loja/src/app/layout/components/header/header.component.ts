import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

 /* auth: Auth;

 constructor(private authService: AuthService) { }
*/
  ngOnInit(): void {

   //capturando os dados do usuário autenticado para exibir no componente
   //this.auth = this.authService.usuarioAutenticado();
  }


}
