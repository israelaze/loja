import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RankingPeriodoComponent } from './components/ranking-periodo/ranking-periodo.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';


@NgModule({
  declarations: [
    RelatoriosComponent,
    RankingPeriodoComponent
  ],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    SharedModule
  ],
  providers: [DatePipe]
})
export class RelatoriosModule { }
