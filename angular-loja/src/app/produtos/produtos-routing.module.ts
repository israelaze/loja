import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoDetalhesComponent } from './components/produto-detalhes/produto-detalhes.component';
import { ProdutoUpdateComponent } from './components/produto-update/produto-update.component';
import { ProdutosCadComponent } from './components/produtos-cad/produtos-cad.component';
import { ProdutosListComponent } from './components/produtos-list/produtos-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'produtos-lista'},

  { path: 'produtos-lista', component: ProdutosListComponent},
  { path: 'cadastrar-produto', component: ProdutosCadComponent },
  { path: 'produto-update/:id', component: ProdutoUpdateComponent },
  { path: 'produto-detalhes/:id', component: ProdutoDetalhesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
