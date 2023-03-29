import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UploadFileService } from './../../services/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit{

  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  preview = '';

  // Expondo um evento/valor para um componente PAI
  @Output() evento = new EventEmitter();

  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit(): void {
  }

  // SELECIONANDO ARQUIVOS
  selectFile(event: any): void {

    this.message = '';
    this.preview = '';

    //capturando o arquivo do evento
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {

      const file: File | null = this.selectedFiles.item(0);

      // imagem deve ser menos que 6MB
      if (file && file.size < 6291456) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        // manipulando um evento
        reader.onload = (e: any) => {

          console.log(e.target.result);

          // carrega a imagem
          this.preview = e.target.result;

          // emite um evento customizado com os dados carregados(preview) para ser utilizado em outro componente
          this.evento.emit(this.currentFile);
        };

        //método assíncrono que inicia a leitura do arquivo e o converte em uma URL de dados.
        reader.readAsDataURL(this.currentFile);
      }else if(file && file.size > 6291456) {

        this.message = 'A imagem não deve ser maior que 6 MB';
        this.evento.emit('erro');

      }else{
        this.currentFile = undefined;
        this.evento.emit('cancelar');
      }
    }
  }

}
