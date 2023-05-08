import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedoresCadComponent } from './components/fornecedores-cad/fornecedores-cad.component';
import { FornecedoresListComponent } from './components/fornecedores-list/fornecedores-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'fornecedores-lista'},

  { path: 'fornecedores-lista', component: FornecedoresListComponent },
  { path: 'cadastrar-fornecedor', component: FornecedoresCadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
