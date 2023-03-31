import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetalhesComponent } from './components/cliente-detalhes/cliente-detalhes.component';
import { ClienteUpdateComponent } from './components/cliente-update/cliente-update.component';
import { ClientesCadComponent } from './components/clientes-cad/clientes-cad.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'clientes-lista'},

  { path: 'clientes-lista', component: ClientesListComponent},
  { path: 'cadastrar-cliente', component: ClientesCadComponent },
  { path: 'cliente-update/:id', component: ClienteUpdateComponent },
  { path: 'cliente-detalhes/:id', component: ClienteDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
