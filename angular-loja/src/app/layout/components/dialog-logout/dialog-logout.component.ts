import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.scss']
})
export class DialogLogoutComponent {

  constructor(private router: Router) { }

  //LOGOUT
  logout(): void {

    //apagar os dados em sessão
    localStorage.removeItem('AUTH');

    //navegando para a página de login
    this.router.navigate(['login']);
  }

}
