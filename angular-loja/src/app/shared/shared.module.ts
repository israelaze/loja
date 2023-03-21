import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DataPipe } from './pipes/data.pipe';

@NgModule({
  declarations: [
    DataPipe,
    ConfirmationDialogComponent
    ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DataPipe,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmationDialogComponent,
  ]
})
export class SharedModule { }
