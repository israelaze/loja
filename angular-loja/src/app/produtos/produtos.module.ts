import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { ProdutoDetalhesComponent } from './components/produto-detalhes/produto-detalhes.component';
import { ProdutoUpdateComponent } from './components/produto-update/produto-update.component';
import { ProdutosCadComponent } from './components/produtos-cad/produtos-cad.component';
import { ProdutosListComponent } from './components/produtos-list/produtos-list.component';
import { ProdutosRoutingModule } from './produtos-routing.module';


@NgModule({
  declarations: [
    ProdutosListComponent,
    ProdutosCadComponent,
    ProdutoDetalhesComponent,
    ProdutoUpdateComponent,
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    SharedModule,
    UploadFileModule
  ]
})
export class ProdutosModule { }
