import { UsuariosCadComponent } from './components/usuarios-cad/usuarios-cad.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '', children: [
      {path: '', component: LoginComponent},
      { path: 'cadastrar-usuario', component: UsuariosCadComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }


// {path: '', pathMatch: 'full', redirectTo: 'clientes-lista'},

// { path: 'clientes-lista', component: ClientesListComponent},
// { path: 'cadastrar-cliente', component: ClientesCadComponent },
