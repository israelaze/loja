import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ClientesModule } from './clientes/clientes.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { HomeModule } from './home/home.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VendedoresModule } from './vendedores/vendedores.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { TraducaoMatPaginatorIntl } from './shared/traducao-mat-paginator-intl';
import { httpInterceptorProviders } from './_interceptors/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule,
    VendedoresModule,
    ClientesModule,
    FornecedoresModule,
    ProdutosModule,
    PedidosModule,
    UsuariosModule,
    RelatoriosModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: TraducaoMatPaginatorIntl},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    httpInterceptorProviders

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
