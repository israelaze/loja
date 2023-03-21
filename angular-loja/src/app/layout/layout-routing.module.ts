import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedoresCadComponent } from './../fornecedores/components/fornecedores-cad/fornecedores-cad.component';
import { FornecedoresListComponent } from './../fornecedores/components/fornecedores-list/fornecedores-list.component';
import { HomeComponent } from './../home/components/home/home.component';
import { ProdutosCadComponent } from './../produtos/components/produtos-cad/produtos-cad.component';
import { ProdutosListComponent } from './../produtos/components/produtos-list/produtos-list.component';
import { RelatoriosComponent } from './../relatorios/components/relatorios/relatorios.component';
import { UsuariosListComponent } from './../usuarios/components/usuarios-list/usuarios-list.component';
import { VendedoresCadComponent } from './../vendedores/components/vendedores-cad/vendedores-cad.component';
import { VendedoresListComponent } from './../vendedores/components/vendedores-list/vendedores-list.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path: '', component: NavComponent, children: [
      {path: 'home', component: HomeComponent},
      { path: 'vendedores-lista', component: VendedoresListComponent },
      { path: 'cadastrar-vendedor', component: VendedoresCadComponent },
      { path: 'fornecedores-lista', component: FornecedoresListComponent },
      { path: 'cadastrar-fornecedor', component: FornecedoresCadComponent },
      { path: 'produtos-lista', component: ProdutosListComponent },
      { path: 'cadastrar-produto', component: ProdutosCadComponent },
      { path: 'usuarios-lista', component: UsuariosListComponent },
      { path: 'relatorios', component: RelatoriosComponent },

      {
        path: 'clientes',
        loadChildren: () => import('../clientes/clientes.module').then(m=> m.ClientesModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then(m=> m.PedidosModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
