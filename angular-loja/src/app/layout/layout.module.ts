import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { DialogLogoutComponent } from './components/dialog-logout/dialog-logout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutRoutingModule } from './layout-routing.module';


@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    DialogLogoutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
