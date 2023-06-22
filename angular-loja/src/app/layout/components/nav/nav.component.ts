import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  usuario: any;

  ngOnInit(): void {
    // capturando usuário autenticado na sessão
    const usuario = JSON.parse(localStorage.getItem('AUTH') as any);
    this.usuario = usuario;

    console.log(usuario);

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogLogoutComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }

}
