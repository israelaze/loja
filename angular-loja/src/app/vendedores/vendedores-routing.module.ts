import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendedoresListComponent } from './components/vendedores-list/vendedores-list.component';
import { VendedoresCadComponent } from './components/vendedores-cad/vendedores-cad.component';

const routes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'vendedores-lista'},
  {path: 'vendedores-lista', component: VendedoresListComponent},
  {path: 'cadastrar-vendedor', component: VendedoresCadComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendedoresRoutingModule { }
