import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogLogoutComponent } from './components/dialog-logout/dialog-logout.component';
import { FooterComponent } from './components/footer/footer.component';


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
