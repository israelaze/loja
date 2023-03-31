import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UploadFileRoutingModule } from './upload-file-routing.module';


@NgModule({
  declarations: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    UploadFileRoutingModule
  ],
  exports: [
    UploadFileComponent
  ]
})
export class UploadFileModule { }
