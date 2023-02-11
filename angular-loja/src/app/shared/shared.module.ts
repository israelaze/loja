import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { DataPipe } from './pipes/data.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    DataPipe,
    ConfirmationDialogComponent
    ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    DataPipe,
    AppMaterialModule,
    ReactiveFormsModule,
    ConfirmationDialogComponent,
  ]
})
export class SharedModule { }
