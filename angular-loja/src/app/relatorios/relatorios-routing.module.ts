import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { RankingPeriodoComponent } from './components/ranking-periodo/ranking-periodo.component';

const routes: Routes = [

  { path: '', component: RelatoriosComponent},
  { path: 'ranking-periodo', component: RankingPeriodoComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
