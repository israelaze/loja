import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './../home/components/home/home.component';
import { UsuariosListComponent } from './../usuarios/components/usuarios-list/usuarios-list.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path: '', component: NavComponent, children: [
      {path: 'home', component: HomeComponent},
      { path: 'usuarios', component: UsuariosListComponent },


      {
        path: 'clientes',
        loadChildren: () => import('../clientes/clientes.module').then(m=> m.ClientesModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('../produtos/produtos.module').then(m=> m.ProdutosModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then(m=> m.PedidosModule)
      },
      {
        path: 'fornecedores',
        loadChildren: ()=> import('../fornecedores/fornecedores.module').then(m=> m.FornecedoresModule)
      },
      {
        path: 'relatorios',
       loadChildren:()=> import('../relatorios/relatorios.module').then(m=> m.RelatoriosModule)
      },
      {
        path: 'vendedores',
       loadChildren:()=> import('../vendedores/vendedores.module').then(m=> m.VendedoresModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
